import { Platform } from 'react-native';

// Where the TeoriPrøve server runs. The web version uses the server it is opened from (kore.mintcloud.info);
// iOS/Android use the live site. Override with EXPO_PUBLIC_API_URL (e.g. http://192.168.1.10:3000 in development).
const webOrigin = Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.origin : null;
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? webOrigin ?? 'https://kore.mintcloud.info').replace(/\/$/, '');
