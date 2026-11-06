// Passkeys (Mojtaba 2026-11-06; the server's side is passkey.js): signing in with the device's own lock and adding a
// passkey to the account. In the browser with WebAuthn; in the Android app with its Credential Manager
// (react-native-passkey, which takes and gives the same JSON as the server), once the site's assetlinks.json names the
// app's signing certificate.
import { Platform } from 'react-native';

import { api } from './api';

// base64url <-> bytes, as WebAuthn's JSON forms use
const toBytes = (s: string) => {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(b, c => c.charCodeAt(0));
};
const toB64 = (buf: ArrayBuffer | null | undefined) => {
  if (!buf) return undefined;
  let s = '';
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const WEB = Platform.OS === 'web';
// (loaded only in the app: the module is native)
const native = () => require('react-native-passkey').Passkey as typeof import('react-native-passkey').Passkey;

export const passkeyOk = () => {
  if (WEB) return typeof window !== 'undefined' && !!(window as any).PublicKeyCredential && !!navigator.credentials;
  if (Platform.OS !== 'android') return false;
  try { return native().isSupported(); } catch { return false; }
};

// The browser or the phone's sheet was closed: not an error to show.
export const cancelled = (e: unknown) => !!e && typeof e === 'object'
  && (['NotAllowedError', 'AbortError'].includes((e as any).name) || ['UserCancelled', 'NoCredentials'].includes((e as any).error));
// The phone's errors are { error, message }: a message to show.
const plain = (e: any) => (e && typeof e === 'object' && !(e instanceof Error) && e.error ? Object.assign(new Error(e.message || e.error), { error: e.error }) : e);

export async function passkeyLogin<T = any>(): Promise<T> {
  const { id, options: o } = await api<{ id: string; options: any }>('POST', 'passkey/loginoptions');
  if (!WEB) {
    let response;
    try { response = await native().get(o); } catch (e) { throw plain(e); }
    return api<T>('POST', 'passkey/login', { id, response });
  }
  const cred = (await navigator.credentials.get({
    publicKey: {
      challenge: toBytes(o.challenge), rpId: o.rpId, timeout: o.timeout, userVerification: o.userVerification,
      allowCredentials: (o.allowCredentials || []).map((c: any) => ({ type: 'public-key', id: toBytes(c.id), transports: c.transports })),
    },
  })) as PublicKeyCredential | null;
  if (!cred) throw Object.assign(new Error('cancelled'), { name: 'NotAllowedError' });
  const r = cred.response as AuthenticatorAssertionResponse;
  const response = {
    id: cred.id, rawId: toB64(cred.rawId), type: cred.type, clientExtensionResults: cred.getClientExtensionResults(),
    response: { clientDataJSON: toB64(r.clientDataJSON), authenticatorData: toB64(r.authenticatorData), signature: toB64(r.signature), userHandle: toB64(r.userHandle) },
  };
  return api<T>('POST', 'passkey/login', { id, response });
}

export type Passkey = { id: string; name: string; created: number; used: number | null };

export async function passkeyAdd(): Promise<Passkey[]> {
  const o = await api<any>('POST', 'passkey/regoptions');
  if (!WEB) {
    let response;
    try { response = await native().create(o); } catch (e) { throw plain(e); }
    return (await api<{ passkeys: Passkey[] }>('POST', 'passkey/register', { response })).passkeys;
  }
  const cred = (await navigator.credentials.create({
    publicKey: {
      challenge: toBytes(o.challenge), rp: o.rp, timeout: o.timeout, attestation: o.attestation,
      user: { id: toBytes(o.user.id), name: o.user.name, displayName: o.user.displayName },
      pubKeyCredParams: o.pubKeyCredParams, authenticatorSelection: o.authenticatorSelection,
      excludeCredentials: (o.excludeCredentials || []).map((c: any) => ({ type: 'public-key', id: toBytes(c.id), transports: c.transports })),
    },
  })) as PublicKeyCredential | null;
  if (!cred) throw Object.assign(new Error('cancelled'), { name: 'NotAllowedError' });
  const r = cred.response as AuthenticatorAttestationResponse;
  const response = {
    id: cred.id, rawId: toB64(cred.rawId), type: cred.type, clientExtensionResults: cred.getClientExtensionResults(),
    response: { clientDataJSON: toB64(r.clientDataJSON), attestationObject: toB64(r.attestationObject),
      transports: typeof r.getTransports === 'function' ? r.getTransports() : undefined },
  };
  return (await api<{ passkeys: Passkey[] }>('POST', 'passkey/register', { response })).passkeys;
}

export const passkeyList = async () => (await api<{ passkeys: Passkey[] }>('GET', 'passkeys')).passkeys;
export const passkeyRemove = async (id: string) => (await api<{ passkeys: Passkey[] }>('POST', 'passkey/remove', { id })).passkeys;
// The offer after signing in was shown (once per account).
export const passkeyAsked = () => api('POST', 'passkey/asked').catch(() => {});
