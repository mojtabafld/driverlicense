// Picture source for expo-image on iOS/Android: authorization header.
export const imgSource = ({ uri, v, token }: { uri: string; v: string; token: string | null }) =>
  ({ uri: v ? `${uri}?${v}` : uri, headers: token ? { Authorization: `Bearer ${token}` } : undefined });
