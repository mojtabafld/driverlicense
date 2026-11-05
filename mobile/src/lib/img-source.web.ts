// Picture source on the web: the session cookie goes with the <img> (same address); a token from before the cookie
// (2026-11-05) in the query string (/img/ only).
export const imgSource = ({ uri, v, token }: { uri: string; v: string; token: string | null }) =>
  ({ uri: `${uri}?${[v, token && token !== 'cookie' ? `t=${token}` : ''].filter(Boolean).join('&')}` });
