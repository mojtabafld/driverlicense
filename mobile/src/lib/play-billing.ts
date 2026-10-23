// Premium bought in the Android app with Google Play Billing (expo-iap; Mojtaba 2026-10-23): the passes as Play products
// (pass_week, pass_month, pass_quarter), their prices as Google shows them in the buyer's country, a purchase made for
// this account (its playId from the server), sent to the server to be checked and counted (POST /api/playpurchase,
// server's playbilling.js), then finished. A purchase left unfinished (the app closed before the server answered) is
// sent again the next time the premium page opens. Only on Android with the server selling in the app; else `on` false.
// (lib/play-billing.web.ts: the web's stand-in, without the native module.)
import {
  endConnection, fetchProducts, finishTransaction, getAvailablePurchases, initConnection, isUserCancelledError,
  purchaseErrorListener, purchaseUpdatedListener, requestPurchase, type Product, type Purchase,
} from 'expo-iap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { api } from './api';
import { useApp } from './store';

export type PlayItem = { id: string; price: string };
type Msg = { ok: boolean; text: string };

export function usePlayBilling(onMsg: (m: Msg) => void) {
  const { play, user, refresh } = useApp();
  const on = Platform.OS === 'android' && !!play && !!user?.playId && !user.guest;
  const [items, setItems] = useState<PlayItem[] | null>(null);
  const [busy, setBusy] = useState(false);
  const msg = useRef(onMsg); msg.current = onMsg;
  const products = play?.products ?? [];

  // A purchase Google reports: counted by the server, then finished (consumed), so the pass can be bought again.
  const handle = useCallback(async (p: Purchase) => {
    if (!products.includes(p.productId)) return;
    if (p.purchaseState === 'pending') { msg.current({ ok: true, text: 'پرداخت در انتظار تأیید است؛ وقتی کامل شد، نسخه‌ی ویژه فعال می‌شود.' }); setBusy(false); return; }
    if (p.purchaseState !== 'purchased' || !p.purchaseToken) return;
    try {
      await api('POST', 'playpurchase', { product: p.productId, token: p.purchaseToken });
      await refresh();
      await finishTransaction({ purchase: p, isConsumable: true }).catch(() => {});
      msg.current({ ok: true, text: 'پرداخت انجام شد و نسخه‌ی ویژه فعال است. ممنون از حمایت شما!' });
    } catch (e) {
      msg.current({ ok: false, text: e instanceof Error && e.message ? e.message : 'خرید ثبت نشد؛ صفحه را دوباره باز کنید.' });
    }
    setBusy(false);
  }, [products.join(','), refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!on) return;
    let live = true;
    const sub = purchaseUpdatedListener(p => { handle(p); });
    const err = purchaseErrorListener(e => {
      setBusy(false);
      if (!isUserCancelledError(e)) msg.current({ ok: false, text: 'خرید انجام نشد؛ دوباره امتحان کنید.' });
    });
    (async () => {
      try {
        await initConnection();
        const list = ((await fetchProducts({ skus: products, type: 'in-app' })) ?? []) as Product[];
        if (live) setItems(products.map(id => list.find(x => x.id === id)).filter((x): x is Product => !!x).map(x => ({ id: x.id, price: x.displayPrice })));
        // Bought but not counted yet: counted now.
        for (const p of (await getAvailablePurchases()) ?? []) handle(p as Purchase);
      } catch {
        if (live) setItems([]);
      }
    })();
    return () => { live = false; sub.remove(); err.remove(); endConnection().catch(() => {}); };
  }, [on, handle]); // eslint-disable-line react-hooks/exhaustive-deps

  const buy = async (id: string) => {
    if (busy || !user?.playId) return;
    setBusy(true);
    try { await requestPurchase({ request: { google: { skus: [id], obfuscatedAccountId: user.playId } }, type: 'in-app' }); }
    catch (e) { setBusy(false); if (!isUserCancelledError(e)) msg.current({ ok: false, text: 'صفحه‌ی پرداخت Google Play باز نشد؛ دوباره امتحان کنید.' }); }
  };
  return { on, items, busy, buy };
}
