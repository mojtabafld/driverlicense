// The server's secret keys from Oracle Cloud Vault (Mojtaba 2026-10-30): run by server.js at its start, when
// TP_VAULT_SECRET (the secret's OCID) is set: `node vault.js <secret OCID>` prints the secret's text, written in the
// form of /etc/teoripro/env (KEY=value lines). It signs in as the server's own compute instance (instance principal:
// the instance is in a dynamic group that a policy lets read the vault's secrets), so no key is needed to read the keys.
'use strict';
const common = require('oci-common');
const { SecretsClient } = require('oci-secrets');

(async () => {
  const id = process.argv[2];
  if (!id) throw new Error('no secret OCID');
  const auth = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
  const client = new SecretsClient({ authenticationDetailsProvider: auth });
  const region = auth.getRegion && auth.getRegion();
  if (region) client.region = region;
  const r = await client.getSecretBundle({ secretId: id });
  const content = r.secretBundle && r.secretBundle.secretBundleContent;
  if (!content || content.contentType !== 'BASE64') throw new Error('unexpected secret content');
  process.stdout.write(Buffer.from(content.content, 'base64').toString('utf8'));
})().catch(e => { process.stderr.write(`vault: ${e.message}\n`); process.exit(1); });
