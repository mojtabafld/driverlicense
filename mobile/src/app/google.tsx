// teoriprove://google: Google sign-in's return to the Android app. The sign-in itself is finished from the browser
// session's result (lib/store.tsx, googleSignIn); Android also hands the link to the app, so this page only goes on to
// the app instead of «Unmatched Route» (Mojtaba 2026-10-30).
import { Redirect } from 'expo-router';

export default function GoogleReturn() {
  return <Redirect href="/" />;
}
