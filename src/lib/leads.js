const STORAGE_KEY = 'it_outsourcing_leads';

export function getLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveLead(lead) {
  const leads = getLeads();
  const newLead = {
    id: crypto.randomUUID?.() ?? Date.now().toString(36),
    ...lead,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return newLead;
}

export function updateLeadStatus(id, status) {
  const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function deleteLead(id) {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}
