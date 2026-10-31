// One command that puts the server's secret keys in Oracle Cloud Vault (Mojtaba 2026-10-31), run once on the server by
// its owner:  sudo node /opt/teoripro/deploy/oracle/vault-setup.js
// It signs in as the server's own compute instance (instance principal: the instance is in a dynamic group that a policy
// lets manage vaults, keys and secrets for the setup), so no API key is handed to anyone. In the server's compartment:
// - the vault «teoripro» (a free, default one), made unless it is there already;
// - its key «teoripro-key» (AES-256, software protection), likewise;
// - the secret «teoripro-env» with the text of /etc/teoripro/env (a new version of it when it is there already);
// then TP_VAULT_SECRET=<the secret's OCID> is written into /etc/teoripro/env, so the server reads its keys from the vault
// at its next start (server.js, vault.js). The keys are never printed. Afterwards the policy can be narrowed to reading.
'use strict';
const fs = require('node:fs');
const common = require('oci-common');
const { KmsVaultClient, KmsManagementClient } = require('oci-keymanagement');
const { VaultsClient } = require('oci-vault');

const ENV = '/etc/teoripro/env', VAULT = 'teoripro', KEY = 'teoripro-key', SECRET = 'teoripro-env';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const step = t => console.log(`== ${t}`);
// Waits until `get()` reports one of the states wanted (vaults and keys take a few minutes to be ready).
async function until(what, get, ok) {
  for (let i = 0; i < 90; i++) {
    const s = await get();
    if (ok.includes(s)) return;
    if (/FAIL|DELET/.test(s)) throw new Error(`${what}: ${s}`);
    if (i % 6 === 0) console.log(`   ${what}: ${s}…`);
    await sleep(10e3);
  }
  throw new Error(`${what}: still not ready after 15 minutes`);
}

(async () => {
  if (process.getuid && process.getuid() !== 0) throw new Error('run it with sudo (it reads and writes /etc/teoripro/env)');
  const env = fs.readFileSync(ENV, 'utf8');
  const meta = await (await fetch('http://169.254.169.254/opc/v2/instance/', { headers: { Authorization: 'Bearer Oracle' } })).json();
  const compartmentId = meta.compartmentId;
  const auth = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
  const region = auth.getRegion();
  const vaults = new KmsVaultClient({ authenticationDetailsProvider: auth }); vaults.region = region;
  const secrets = new VaultsClient({ authenticationDetailsProvider: auth }); secrets.region = region;

  step('vault');
  let vault = (await vaults.listVaults({ compartmentId })).items.find(v => v.displayName === VAULT && !/DELET/.test(v.lifecycleState));
  if (!vault) vault = (await vaults.createVault({ createVaultDetails: { compartmentId, displayName: VAULT, vaultType: 'DEFAULT' } })).vault;
  await until('vault', async () => (vault = (await vaults.getVault({ vaultId: vault.id })).vault).lifecycleState, ['ACTIVE']);

  step('key');
  const keys = new KmsManagementClient({ authenticationDetailsProvider: auth }); keys.endpoint = vault.managementEndpoint;
  let key = (await keys.listKeys({ compartmentId })).items.find(k => k.displayName === KEY && !/DELET|DISABL/.test(k.lifecycleState));
  if (!key) key = (await keys.createKey({ createKeyDetails: { compartmentId, displayName: KEY, keyShape: { algorithm: 'AES', length: 32 }, protectionMode: 'SOFTWARE' } })).key;
  await until('key', async () => (await keys.getKey({ keyId: key.id })).key.lifecycleState, ['ENABLED']);

  step('secret');
  const content = { contentType: 'BASE64', content: Buffer.from(env, 'utf8').toString('base64') };
  let secret = (await secrets.listSecrets({ compartmentId, name: SECRET, vaultId: vault.id })).items.find(s => !/DELET/.test(s.lifecycleState));
  if (secret) secret = (await secrets.updateSecret({ secretId: secret.id, updateSecretDetails: { secretContent: content } })).secret;
  else secret = (await secrets.createSecret({ createSecretDetails: { compartmentId, secretName: SECRET, vaultId: vault.id, keyId: key.id, secretContent: content,
    description: 'Teoripro server keys (the text of /etc/teoripro/env)' } })).secret;
  await until('secret', async () => (await secrets.getSecret({ secretId: secret.id })).secret.lifecycleState, ['ACTIVE']);

  step('server settings');
  const line = `TP_VAULT_SECRET=${secret.id}`;
  const next = /^TP_VAULT_SECRET=.*$/m.test(env) ? env.replace(/^TP_VAULT_SECRET=.*$/m, line) : `${env.replace(/\n*$/, '\n')}${line}\n`;
  fs.writeFileSync(ENV, next);
  console.log(`Done: the keys are in the vault «${VAULT}», secret «${SECRET}» (${secret.id}).`);
  console.log('Next: sudo systemctl restart teoripro');
})().catch(e => { console.error(`vault setup: ${e.message}`); process.exit(1); });
