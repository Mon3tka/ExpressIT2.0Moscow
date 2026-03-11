import { ensureAdmin, getConfig, saveConfig } from './_lib/db.js';
import { verifyToken } from './_lib/auth.js';

export async function GET() {
  try {
    await ensureAdmin();
    const data = await getConfig();
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: 'Ошибка чтения конфига' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = verifyToken(request.headers.get('Authorization'));
    if (!user) {
      return Response.json({ error: 'Требуется авторизация' }, { status: 401 });
    }
    const body = await request.json();
    await saveConfig(body);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: 'Ошибка сохранения' }, { status: 500 });
  }
}
