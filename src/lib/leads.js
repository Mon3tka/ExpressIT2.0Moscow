/** Заявки: API в приоритете, localStorage как fallback */

import { apiCreateLead } from './api';

const STORAGE_KEY = 'it_outsourcing_leads';

function getLeadsLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/** Для админки — используется api.getLeads, не этот модуль */
export function getLeads() {
  return getLeadsLocal();
}

export async function saveLead(lead) {
  try {
    const res = await apiCreateLead(lead);
    return res;
  } catch (_) {
    const list = getLeadsLocal();
    const newLead = {
      id: crypto.randomUUID?.() ?? Date.now().toString(36),
      ...lead,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newLead;
  }
}
