// Premium ("نسخه‌ی ویژه") bought with Stripe Checkout: a pass for a week, a month or three months (one payment each, no
// automatic renewal); buying again adds its days to the end of the current pass.
// Env: STRIPE_SECRET_KEY (sk_/rk_ test_… or live_…; without it there is nothing to buy and nothing is locked),
// STRIPE_WEBHOOK_SECRET (whsec_…, the webhook's signing secret), PREMIUM_PRICE_WEEK / _MONTH / _QUARTER (kroner, defaults
// 49 / 79 / 149), PROMO_CODE (codes, comma-separated, that give a free trial of PROMO_DAYS days, default 3; each account
// can take a trial only once, whichever code) and PREMIUM_GATE (0: everyone keeps the AI analysis and the read-aloud; otherwise they are only for
// accounts with a pass, and admins).
// Stripe is called over its REST API with fetch (no SDK). STRIPE_API_BASE only points the calls elsewhere for tests.
'use strict';
const crypto = require('node:crypto');

const key = () => (process.env.STRIPE_SECRET_KEY || '').trim();
const available = () => /^(sk|rk)_(test|live)_/.test(key());
const testMode = () => /^(sk|rk)_test_/.test(key());
const gated = () => available() && process.env.PREMIUM_GATE !== '0';
const kr = (v, d) => { const n = Math.round(+v); return Number.isFinite(n) && n >= 5 && n <= 10000 ? n : d; };
const PLANS = {
  week: { days: 7, price: () => kr(process.env.PREMIUM_PRICE_WEEK, 49), name: 'Teoripro Premium – 1 uge' },
  month: { days: 30, price: () => kr(process.env.PREMIUM_PRICE_MONTH, 79), name: 'Teoripro Premium – 1 måned' },
  quarter: { days: 90, price: () => kr(process.env.PREMIUM_PRICE_QUARTER, 149), name: 'Teoripro Premium – 3 måneder' },
};
const plans = () => Object.entries(PLANS).map(([id, p]) => ({ id, days: p.days, price: p.price() }));
const base = () => (process.env.STRIPE_API_BASE || 'https://api.stripe.com').replace(/\/$/, '');

// Stripe's form encoding of nested objects: a[b][c]=v.
function form(obj, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const name = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') form(v, name, out); else out.append(name, String(v));
  }
  return out;
}
async function stripe(method, path, body) {
  const res = await fetch(`${base()}/v1/${path}`, {
    method,
    headers: { Authorization: `Bearer ${key()}`, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) },
    body: body ? form(body).toString() : undefined,
    signal: AbortSignal.timeout(20e3),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('stripe', method, path, res.status, data.error && data.error.message);
    throw Object.assign(new Error('پرداخت الان در دسترس نیست؛ کمی بعد دوباره امتحان کنید.'), { status: 502 });
  }
  return data;
}

// A Checkout page for this user and plan; Stripe sends them back to `origin` + /premium with ?paid=<session id> or
// ?canceled=1.
async function createCheckout(username, plan, origin, lang) {
  const p = PLANS[plan];
  if (!p) throw Object.assign(new Error('bad plan'), { status: 400 });
  const s = await stripe('POST', 'checkout/sessions', {
    mode: 'payment',
    client_reference_id: username,
    metadata: { username, product: 'premium', plan },
    payment_intent_data: { metadata: { username, product: 'premium', plan } },
    line_items: { 0: { quantity: 1, price_data: { currency: 'dkk', unit_amount: p.price() * 100,
      product_data: { name: p.name, description: 'AI-analyse af dine svar og oplæsning af spørgsmålene. Ingen automatisk fornyelse.' } } } },
    locale: lang === 'da' ? 'da' : lang === 'en' ? 'en' : 'auto',
    success_url: `${origin}/premium?paid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/premium?canceled=1`,
  });
  return s.url;
}
const getSession = id => stripe('GET', `checkout/sessions/${encodeURIComponent(id)}`);
// The newest finished Checkout sessions (up to 100) that bought premium and are paid: the server counts any it missed
// (a webhook that did not arrive, or a buyer who did not come back to the site).
async function recentPaid() {
  const d = await stripe('GET', 'checkout/sessions?limit=100&status=complete');
  return (d.data || []).filter(s => s.payment_status === 'paid' && (s.metadata || {}).product === 'premium');
}

// user.premium: { until (ms), plan, buys: [{ session, pi, plan, days, amount, currency, at, test }] } (the newest 50).
const active = u => !!(u.premium && u.premium.until > Date.now());
const hasSession = (u, id) => !!(u.premium && (u.premium.buys || []).some(b => b.session === id));
// A paid Checkout session of this user: its plan's days added after the current pass (or from now). Returns false when
// the session was counted already.
function grant(u, s) {
  if (hasSession(u, s.id)) return false;
  const plan = PLANS[(s.metadata || {}).plan] ? s.metadata.plan : 'month';
  const now = Date.now(), from = Math.max(now, (u.premium && u.premium.until) || 0);
  const buy = { session: s.id, pi: typeof s.payment_intent === 'string' ? s.payment_intent : undefined, plan, days: PLANS[plan].days,
    amount: s.amount_total, currency: s.currency, at: now, test: !s.livemode || undefined };
  // (A trial had before stays on record, so the code cannot be used a second time after a purchase.)
  u.premium = { until: from + PLANS[plan].days * 864e5, plan, buys: [...((u.premium && u.premium.buys) || []), buy].slice(-50),
    ...(u.premium && u.premium.promo ? { promo: u.premium.promo } : {}) };
  return true;
}
// The free trial codes (upper case) and its length in days.
const promoCodes = () => (process.env.PROMO_CODE || '').split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
const promoDays = () => { const n = Math.round(+process.env.PROMO_DAYS); return Number.isFinite(n) && n >= 1 && n <= 90 ? n : 3; };
// A trial with `code`: its days added after the current pass (or from now), once per account. Returns false when the
// account has had its trial already.
function grantPromo(u, code, email) {
  // Once per account, for good: kept outside the pass too (u.promoUsed), so nothing that rewrites the pass can open it again.
  if (u.promoUsed || (u.premium && u.premium.promo)) return false;
  const now = Date.now(), days = promoDays(), from = Math.max(now, (u.premium && u.premium.until) || 0);
  u.premium = { ...(u.premium || {}), until: from + days * 864e5, plan: (u.premium && u.premium.plan) || 'trial', promo: { code, days, at: now, email } };
  u.promoUsed = now;
  if (email) u.promoEmail = email;
  return true;
}
// A fully refunded payment: its days taken off the pass. Returns false when the payment is not this user's.
function refund(u, pi) {
  const buys = (u.premium && u.premium.buys) || [], b = buys.find(x => x.pi === pi && !x.refunded);
  if (!b) return false;
  b.refunded = Date.now();
  u.premium.until = Math.max(Date.now(), u.premium.until - b.days * 864e5);
  if (u.premium.until <= Date.now() + 1000) u.premium.until = Date.now();
  return true;
}

// The webhook's Stripe-Signature header: t=<time>,v1=<hmac>…; the HMAC-SHA256 of "<t>.<raw body>" with the signing
// secret, at most 5 minutes old. Returns the event or null.
function verifyEvent(raw, header, secret = process.env.STRIPE_WEBHOOK_SECRET || '', now = Date.now()) {
  if (!secret || !header) return null;
  const parts = String(header).split(',').map(p => p.split('='));
  const t = +(parts.find(p => p[0] === 't') || [])[1];
  const sigs = parts.filter(p => p[0] === 'v1').map(p => p[1] || '');
  if (!Number.isFinite(t) || Math.abs(now / 1000 - t) > 300 || !sigs.length) return null;
  const want = crypto.createHmac('sha256', secret).update(`${t}.`).update(raw).digest();
  const ok = sigs.some(s => { const b = Buffer.from(s, 'hex'); return b.length === want.length && crypto.timingSafeEqual(b, want); });
  if (!ok) return null;
  try { return JSON.parse(raw.toString('utf8')); } catch { return null; }
}

module.exports = { available, testMode, gated, plans, createCheckout, getSession, recentPaid, active, hasSession, grant, refund, verifyEvent, promoCodes, promoDays, grantPromo };
