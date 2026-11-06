// Passkeys in the browser (Mojtaba 2026-11-06; the server's side is passkey.js): signing in with the device's own
// lock and adding a passkey to the account. The web version only for now; the Android app needs its own native module
// and a new build, so there `passkeyOk()` is false and the buttons are not shown.
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

export const passkeyOk = () => Platform.OS === 'web' && typeof window !== 'undefined' && !!(window as any).PublicKeyCredential && !!navigator.credentials;

// The browser cancelled or the user closed its window: not an error to show.
export const cancelled = (e: unknown) => !!e && typeof e === 'object' && ['NotAllowedError', 'AbortError'].includes((e as any).name);

export async function passkeyLogin<T = any>(): Promise<T> {
  const { id, options: o } = await api<{ id: string; options: any }>('POST', 'passkey/loginoptions');
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
