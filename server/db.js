import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'site.db');

let db = null;

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) => join(__dirname, '..', 'node_modules', 'sql.js', 'dist', file),
  });

  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS site_config (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL DEFAULT '{}',
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT,
      phone TEXT,
      email TEXT,
      comment TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
  db.run(`INSERT OR IGNORE INTO site_config (id, data) VALUES (1, '{}');`);

  return db;
}

function persist() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    writeFileSync(DB_PATH, buffer);
  }
}

export async function ensureAdmin() {
  const d = await getDb();
  const row = d.exec("SELECT password_hash FROM admin WHERE id = 1");
  if (row.length > 0 && row[0].values.length > 0) return;

  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = bcrypt.hashSync(password, 10);
  d.run('INSERT OR REPLACE INTO admin (id, password_hash) VALUES (1, ?)', [hash]);
  persist();
}

export async function verifyAdmin(password) {
  const d = await getDb();
  const row = d.exec("SELECT password_hash FROM admin WHERE id = 1");
  if (row.length === 0 || row[0].values.length === 0) return false;
  return bcrypt.compareSync(password, row[0].values[0][0]);
}

export async function getConfig() {
  const d = await getDb();
  const row = d.exec("SELECT data FROM site_config WHERE id = 1");
  return row.length > 0 && row[0].values.length > 0
    ? JSON.parse(row[0].values[0][0])
    : {};
}

export async function saveConfig(data) {
  const d = await getDb();
  const json = JSON.stringify(data);
  d.run("UPDATE site_config SET data = ?, updated_at = datetime('now') WHERE id = 1", [json]);
  persist();
}

export async function getLeads() {
  const d = await getDb();
  const row = d.exec("SELECT id, name, phone, email, comment, status, created_at FROM leads ORDER BY created_at DESC");
  if (row.length === 0) return [];
  const cols = row[0].columns;
  const idx = (c) => cols.indexOf(c);
  return row[0].values.map((v) => ({
    id: v[idx('id')],
    name: v[idx('name')],
    phone: v[idx('phone')],
    email: v[idx('email')],
    comment: v[idx('comment')],
    status: v[idx('status')] || 'new',
    createdAt: v[idx('created_at')],
  }));
}

export async function createLead(lead) {
  const d = await getDb();
  const id = crypto.randomUUID?.() ?? Date.now().toString(36);
  d.run(
    "INSERT INTO leads (id, name, phone, email, comment, status) VALUES (?, ?, ?, ?, ?, 'new')",
    [id, lead.name || '', lead.phone || '', lead.email || '', lead.comment || '']
  );
  persist();
  return { id, ...lead, status: 'new', createdAt: new Date().toISOString() };
}

export async function updateLeadStatus(id, status) {
  const d = await getDb();
  d.run('UPDATE leads SET status = ? WHERE id = ?', [status, id]);
  persist();
}

export async function deleteLead(id) {
  const d = await getDb();
  d.run('DELETE FROM leads WHERE id = ?', [id]);
  persist();
}
