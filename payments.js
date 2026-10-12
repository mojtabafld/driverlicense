// Premium ("نسخه‌ی ویژه") bought with Stripe Checkout: one payment unlocks the premium features for the account for good.
// Env: STRIPE_SECRET_KEY (sk_test_… or sk_live_…; without it there is nothing to buy), STRIPE_WEBHOOK_SECRET (whsec_…, the
// webhook's signing secret), PREMIUM_PRICE_DKK (the price in Danish kroner, default 149) and PREMIUM_GATE (1: the AI
// analysis and the read-aloud are only for premium accounts and admins; otherwise everyone keeps them, as before).
// Stripe is called over its REST API with fetch (no SDK). STRIPE_API_BASE only points the calls elsewhere for tests.
'use strict';
const crypto = require('node:crypto');

const key = () => (process.env.STRIPE_SECRET_KEY || '').trim();
const available = () => /^(sk|rk)_(test|live)_/.test(key());
const testMode = () => /^(sk|rk)_test_/.test(key());
const gated = () => available() && process.env.PREMIUM_GATE === '1';
const priceDkk = () => { const n = Math.round(+process.env.PREMIUM_PRICE_DKK); return Number.isFinite(n) && n >= 5 && n <= 10000 ? n : 149; };
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

// A Checkout page for this user; Stripe sends them back to `origin` + /premium with ?paid=<session id> or ?canceled=1.
async function createCheckout(username, origin, lang) {
  const s = await stripe('POST', 'checkout/sessions', {
    mode: 'payment',
    client_reference_id: username,
    metadata: { username, product: 'premium' },
    payment_intent_data: { metadata: { username, product: 'premium' } },
    line_items: { 0: { quantity: 1, price_data: { currency: 'dkk', unit_amount: priceDkk() * 100,
      product_data: { name: 'TeoriPrøve Premium', description: 'AI-analyse af dine svar og oplæsning af spørgsmålene, for altid.' } } } },
    locale: lang === 'da' ? 'da' : lang === 'en' ? 'en' : 'auto',
    success_url: `${origin}/premium?paid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/premium?canceled=1`,
  });
  return s.url;
}
const getSession = id => stripe('GET', `checkout/sessions/${encodeURIComponent(id)}`);

// What is kept on the user when a paid Checkout session belongs to them.
const grantOf = s => ({ at: Date.now(), session: s.id, pi: typeof s.payment_intent === 'string' ? s.payment_intent : undefined,
  amount: s.amount_total, currency: s.currency, test: !s.livemode || undefined });

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

module.exports = { available, testMode, gated, priceDkk, createCheckout, getSession, grantOf, verifyEvent };
