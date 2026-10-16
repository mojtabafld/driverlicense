// teoriprove://verified: the confirmation email's link opening the Android app (the server's /api/verify). The card
// saying the account is active is ui/verified-popup.tsx; this page only goes on to the app.
import { Redirect } from 'expo-router';

export default function Verified() {
  return <Redirect href="/" />;
}
