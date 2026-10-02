// Picture source on the web: an <img> cannot send headers, so the token goes in the query string (/img/ only).
export const imgSource = ({ uri, v, token }: { uri: string; v: string; token: string | null }) =>
  ({ uri: `${uri}?${[v, token ? `t=${token}` : ''].filter(Boolean).join('&')}` });
