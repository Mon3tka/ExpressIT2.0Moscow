/** API-клиент для бэкенда */

const TOKEN_KEY = 'expressit_admin_token';

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch (_) {}
}

export function clearToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch (_) {}
}

async function fetchApi(path, options = {}) {
  const url = path.startsWith('/') ? path : `/api/${path}`;
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = res.headers.get('content-type')?.includes('json') ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const err = new Error(data?.error || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function apiLogin(password) {
  return fetchApi('auth/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export async function apiGetConfig() {
  return fetchApi('config');
}

export async function apiSaveConfig(config) {
  return fetchApi('config', {
    method: 'PUT',
    body: JSON.stringify(config),
  });
}

export async function apiGetLeads() {
  return fetchApi('leads');
}

export async function apiCreateLead(lead) {
  return fetchApi('leads', {
    method: 'POST',
    body: JSON.stringify(lead),
  });
}

export async function apiUpdateLeadStatus(id, status) {
  return fetchApi(`leads/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function apiDeleteLead(id) {
  return fetchApi(`leads/${id}`, { method: 'DELETE' });
}
