import { ensureAdmin } from '../_lib/db.js';
import { verifyToken } from '../_lib/auth.js';
import { getLeads, createLead } from '../_lib/db.js';

export async function GET(request) {
  try {
    const user = verifyToken(request.headers.get('Authorization'));
    if (!user) {
      return Response.json({ error: 'Требуется авторизация' }, { status: 401 });
    }
    const leads = await getLeads();
    return Response.json(leads);
  } catch (e) {
    return Response.json({ error: 'Ошибка получения заявок' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureAdmin();
    const body = await request.json();
    const lead = await createLead(body);
    return Response.json(lead, { status: 201 });
  } catch (e) {
    return Response.json({ error: 'Ошибка создания заявки' }, { status: 500 });
  }
}
