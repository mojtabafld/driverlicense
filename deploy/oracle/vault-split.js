// One command that splits «teoripro-env» into one secret for each variable (Mojtaba 2026-10-31), so the vault's page
// lists every key by its own name, as on DigitalOcean, and each is changed on its own (vault.js reads them over the
// base). Run once on the server by its owner, while a policy lets the server manage secrets:
//   sudo node /opt/teoripro/deploy/oracle/vault-split.js
// A variable that has its own secret already is left as it is. «teoripro-env» stays, as the base the others override.
// The values are never printed.
'use strict';
const fs = require('node:fs');
const common = require('oci-common');
const { SecretsClient } = require('oci-secrets');
const { VaultsClient } = require('oci-vault');

const NAME = /^[A-Z][A-Z0-9_]*$/;
(async () => {
  if (process.getuid && process.getuid() !== 0) throw new Error('run it with sudo (it reads /etc/teoripro/env)');
  const id = (/^TP_VAULT_SECRET=(.+)$/m.exec(fs.readFileSync('/etc/teoripro/env', 'utf8')) || [])[1];
  if (!id) throw new Error('no TP_VAULT_SECRET in /etc/teoripro/env (run vault-setup.js first)');
  const auth = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
  const bundles = new SecretsClient({ authenticationDetailsProvider: auth }), vaults = new VaultsClient({ authenticationDetailsProvider: auth });
  bundles.region = vaults.region = auth.getRegion();
  const base = (await vaults.getSecret({ secretId: id })).secret;
  const c = (await bundles.getSecretBundle({ secretId: id })).secretBundle.secretBundleContent;
  const text = Buffer.from(c.content, 'base64').toString('utf8');
  const have = new Set();
  for (let page; ;) {
    const r = await vaults.listSecrets({ compartmentId: base.compartmentId, vaultId: base.vaultId, limit: 100, page });
    r.items.filter(s => !/DELET/.test(s.lifecycleState)).forEach(s => have.add(s.secretName));
    if (!(page = r.opcNextPage)) break;
  }
  let made = 0, kept = 0;
  for (const line of text.split(/\r?\n/)) {
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m || line.trim().startsWith('#') || !NAME.test(m[1]) || m[1] === 'TP_VAULT_SECRET') continue;
    const value = m[2].replace(/^(['"])(.*)\1$/, '$2');
    if (have.has(m[1])) { kept++; continue; }
    if (!value) continue;   // (an empty one: nothing to keep; the vault takes no empty secret)
    await vaults.createSecret({ createSecretDetails: { compartmentId: base.compartmentId, vaultId: base.vaultId, keyId: base.keyId, secretName: m[1],
      secretContent: { contentType: 'BASE64', content: Buffer.from(value, 'utf8').toString('base64') } } });
    have.add(m[1]); made++;
    console.log(`   ${m[1]}`);
  }
  console.log(`Done: ${made} secrets made, ${kept} there already. Next: sudo systemctl restart teoripro`);
})().catch(e => { console.error(`vault split: ${e.message}`); process.exit(1); });
