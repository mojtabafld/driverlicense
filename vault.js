// The server's secret keys from Oracle Cloud Vault (Mojtaba 2026-10-30): run by server.js at its start, when
// TP_VAULT_SECRET (the OCID of the secret «teoripro-env») is set: `node vault.js <secret OCID>` prints KEY=value lines.
// - «teoripro-env» holds the whole env file's text (vault-setup.js put it there), the base;
// - every other secret in the same vault named like a variable (e.g. STRIPE_SECRET_KEY) holds that one variable's value,
//   and takes its place: a key is changed or added in the console by its own name and value, as on DigitalOcean
//   (Mojtaba 2026-10-31).
// It signs in as the server's own compute instance (instance principal: the instance is in a dynamic group that a policy
// lets read the vault's secrets), so no key is needed to read the keys.
'use strict';
const common = require('oci-common');
const { SecretsClient } = require('oci-secrets');
const { VaultsClient } = require('oci-vault');

const NAME = /^[A-Z][A-Z0-9_]*$/;
(async () => {
  const id = process.argv[2];
  if (!id) throw new Error('no secret OCID');
  const auth = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
  const region = auth.getRegion && auth.getRegion();
  const bundles = new SecretsClient({ authenticationDetailsProvider: auth }), vaults = new VaultsClient({ authenticationDetailsProvider: auth });
  if (region) { bundles.region = region; vaults.region = region; }
  const text = async secretId => {
    const c = (await bundles.getSecretBundle({ secretId })).secretBundle.secretBundleContent;
    if (!c || c.contentType !== 'BASE64') throw new Error('unexpected secret content');
    return Buffer.from(c.content, 'base64').toString('utf8');
  };
  let out = await text(id);
  // the variables of their own, by name (newest versions), after the base so that they win; should they not be read,
  // the base alone (the server must not stay down for one of them)
  try {
    const base = (await vaults.getSecret({ secretId: id })).secret;
    const all = [];
    for (let page; ;) {
      const r = await vaults.listSecrets({ compartmentId: base.compartmentId, vaultId: base.vaultId, limit: 100, page });
      all.push(...r.items);
      if (!(page = r.opcNextPage)) break;
    }
    const own = all
      .filter(s => s.id !== id && s.lifecycleState === 'ACTIVE' && NAME.test(s.secretName))
      .sort((a, b) => a.secretName.localeCompare(b.secretName));
    for (const s of own) {
      try { out += `\n${s.secretName}=${(await text(s.id)).replace(/\r?\n+$/, '').replace(/\n/g, '\\n')}`; }
      catch (e) { process.stderr.write(`vault: ${s.secretName} not read: ${e.message}\n`); }
    }
  } catch (e) { process.stderr.write(`vault: the variables of their own not listed: ${e.message}\n`); }
  process.stdout.write(`${out}\n`);
})().catch(e => { process.stderr.write(`vault: ${e.message}\n`); process.exit(1); });
