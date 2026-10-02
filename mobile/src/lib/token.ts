// Session token on iOS/Android: the device keychain / keystore.
import * as SecureStore from 'expo-secure-store';

const KEY = 'tp_token';
export const loadToken = () => SecureStore.getItemAsync(KEY);
export const saveToken = (t: string | null) => (t ? SecureStore.setItemAsync(KEY, t) : SecureStore.deleteItemAsync(KEY));
