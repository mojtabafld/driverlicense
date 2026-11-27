// Play Integrity (Mojtaba 2026-11-06; the server's side is integrity.js): the Android app shows the server, at most once
// a day per account on this phone, Google Play's word that it is this app as Play installed it, on a real device. Quiet:
// nothing is shown, and a failure (no Play services, no connection) changes nothing for the user.
import { Platform } from 'react-native';

import { api } from './api';

const DAY = 864e5;
let running = false;

export async function checkIntegrity(project: string | undefined, username: string) {
  if (Platform.OS !== 'android' || !project || running) return;
  running = true;
  try {
    const SecureStore = require('expo-secure-store') as typeof import('expo-secure-store');
    const key = 'tp_pi_' + username.replace(/[^a-zA-Z0-9._-]/g, '_');
    const last = Number(await SecureStore.getItemAsync(key).catch(() => null)) || 0;
    if (Date.now() - last < DAY) return;
    const PI = require('@expo/app-integrity') as typeof import('@expo/app-integrity');
    await PI.prepareIntegrityTokenProviderAsync(project);
    const { nonce } = await api<{ nonce: string }>('GET', 'integrity/nonce');
    const token = await PI.requestIntegrityCheckAsync(nonce);
    await api('POST', 'integrity/check', { token });
    await SecureStore.setItemAsync(key, String(Date.now())).catch(() => {});
  } catch {
    // (tried again at the next start)
  } finally {
    running = false;
  }
}
