import { ensureAdmin, verifyAdmin } from '../_lib/db.js';
import { signToken } from '../_lib/auth.js';

export async function POST(request) {
  try {
    await ensureAdmin();
    const body = await request.json();
    const { password } = body || {};
    if (!password) {
      return Response.json({ error: 'Укажите пароль' }, { status: 400 });
    }
    const ok = await verifyAdmin(password);
    if (!ok) {
      return Response.json({ error: 'Неверный пароль' }, { status: 401 });
    }
    const token = signToken();
    return Response.json({ token });
  } catch (e) {
    return Response.json({ error: 'Ошибка входа' }, { status: 500 });
  }
}
