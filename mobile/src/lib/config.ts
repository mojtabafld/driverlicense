// Where the TeoriPrøve server runs. Override with EXPO_PUBLIC_API_URL (e.g. http://192.168.1.10:3000 in development).
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'https://kore.mintcloud.info').replace(/\/$/, '');
