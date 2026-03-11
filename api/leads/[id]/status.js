import { verifyToken } from '../../_lib/auth.js';
import { updateLeadStatus } from '../../_lib/db.js';

function getIdFromUrl(url) {
  const match = url.match(/\/api\/leads\/([^/]+)\/status/);
  return match ? match[1] : null;
}

export async function PUT(request, context) {
  try {
    const user = verifyToken(request.headers.get('Authorization'));
    if (!user) {
      return Response.json({ error: 'Требуется авторизация' }, { status: 401 });
    }
    const id = context?.params?.id ?? getIdFromUrl(request.url);
    if (!id) {
      return Response.json({ error: 'ID не указан' }, { status: 400 });
    }
    const body = await request.json();
    const { status } = body || {};
    if (!status) {
      return Response.json({ error: 'Статус не указан' }, { status: 400 });
    }
    await updateLeadStatus(id, status);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: 'Ошибка обновления' }, { status: 500 });
  }
}
