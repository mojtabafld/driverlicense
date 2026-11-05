// Turns an encrypted daily backup (backups/db-<day>.json.gz.enc, backup.js) back into its .json.gz:
//   BACKUP_KEY='…the vault's value…' node scripts/backup-decrypt.js db-2026-11-05.json.gz.enc
// writes db-2026-11-05.json.gz beside it (then: gunzip, or zlib.gunzipSync + JSON.parse in a restore script).
'use strict';
const fs = require('node:fs');
const { open } = require('../backup');

const file = process.argv[2], pass = String(process.env.BACKUP_KEY || '').trim();
if (!file || !pass) { console.error('usage: BACKUP_KEY=… node scripts/backup-decrypt.js <file.json.gz.enc>'); process.exit(2); }
const out = file.replace(/\.enc$/, '') === file ? `${file}.gz` : file.replace(/\.enc$/, '');
fs.writeFileSync(out, open(fs.readFileSync(file), pass));
console.log('written', out);
