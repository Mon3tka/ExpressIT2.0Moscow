/** Общий API handler — ловит все /api/* (Vercel catch-all) */

import { ensureAdmin, verifyAdmin, getConfig, saveConfig, getLeads, createLead, updateLeadStatus, deleteLead } from './_lib/db.js';
import { verifyToken, signToken } from './_lib/auth.js';

export default {
  async fetch(req) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/?/, '') || '';
  const method = req.method;

  const json = async () => {
    try {
      return await req.json();
    } catch {
      return {};
    }
  };

  const res = (data, status = 200) => Response.json(data, { status });
  const err = (msg, status = 500) => Response.json({ error: msg }, { status });

  try {
    if (path === 'auth/login' && method === 'POST') {
      await ensureAdmin();
      const { password } = await json();
      if (!password) return err('Укажите пароль', 400);
      if (!(await verifyAdmin(password))) return err('Неверный пароль', 401);
      return res({ token: signToken() });
    }

    if (path === 'config') {
      if (method === 'GET') {
        await ensureAdmin();
        return res(await getConfig());
      }
      if (method === 'PUT') {
        const user = verifyToken(req.headers.get('Authorization'));
        if (!user) return err('Требуется авторизация', 401);
        await saveConfig(await json());
        return res({ ok: true });
      }
    }

    if (path === 'leads') {
      if (method === 'GET') {
        const user = verifyToken(req.headers.get('Authorization'));
        if (!user) return err('Требуется авторизация', 401);
        return res(await getLeads());
      }
      if (method === 'POST') {
        const lead = await createLead(await json());
        return res(lead, 201);
      }
    }

    const leadIdMatch = path.match(/^leads\/([^/]+)(?:\/status)?$/);
    if (leadIdMatch) {
      const id = leadIdMatch[1];
      const user = verifyToken(req.headers.get('Authorization'));
      if (!user) return err('Требуется авторизация', 401);
      if (path.endsWith('/status') && method === 'PUT') {
        const { status } = await json();
        if (!status) return err('Статус не указан', 400);
        await updateLeadStatus(id, status);
        return res({ ok: true });
      }
      if (!path.endsWith('/status') && method === 'DELETE') {
        await deleteLead(id);
        return res({ ok: true });
      }
    }

    if (path === '' && method === 'GET') return res({ ok: true, version: 1 });
    return err('Not Found', 404);
  } catch (e) {
    console.error(e);
    return err(e?.message || 'Ошибка сервера', 500);
  }
  },
};
