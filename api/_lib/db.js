/** Upstash Redis — хранилище для Vercel Serverless */

import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const KEYS = { config: 'expressit:config', adminHash: 'expressit:admin:hash', leads: 'expressit:leads' };

export async function ensureAdmin() {
  const resetPassword = process.env.ADMIN_RESET_PASSWORD;
  if (resetPassword) {
    const newHash = bcrypt.hashSync(resetPassword, 10);
    await redis.set(KEYS.adminHash, newHash);
    return;
  }
  const hash = await redis.get(KEYS.adminHash);
  if (hash) return;
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const newHash = bcrypt.hashSync(password, 10);
  await redis.set(KEYS.adminHash, newHash);
}

export async function verifyAdmin(password) {
  const hash = await redis.get(KEYS.adminHash);
  if (!hash) return false;
  return bcrypt.compareSync(password, hash);
}

export async function getConfig() {
  const data = await redis.get(KEYS.config);
  return data ? JSON.parse(data) : {};
}

export async function saveConfig(data) {
  await redis.set(KEYS.config, JSON.stringify(data));
}

export async function getLeads() {
  const raw = await redis.get(KEYS.leads);
  const list = raw ? JSON.parse(raw) : [];
  return Array.isArray(list) ? list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
}

export async function createLead(lead) {
  const list = await getLeads();
  const id = crypto.randomUUID?.() ?? Date.now().toString(36);
  const newLead = { id, ...lead, status: 'new', createdAt: new Date().toISOString() };
  list.unshift(newLead);
  await redis.set(KEYS.leads, JSON.stringify(list));
  return newLead;
}

export async function updateLeadStatus(id, status) {
  const list = await getLeads();
  const idx = list.findIndex((l) => l.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], status };
  await redis.set(KEYS.leads, JSON.stringify(list));
}

export async function deleteLead(id) {
  const list = (await getLeads()).filter((l) => l.id !== id);
  await redis.set(KEYS.leads, JSON.stringify(list));
}
