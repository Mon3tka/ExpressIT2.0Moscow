import { verifyToken } from '../_lib/auth.js';
import { deleteLead } from '../_lib/db.js';

function getIdFromUrl(url) {
  const match = url.match(/\/api\/leads\/([^/?]+)/);
  return match ? match[1] : null;
}

export async function DELETE(request, context) {
  try {
    const user = verifyToken(request.headers.get('Authorization'));
    if (!user) {
      return Response.json({ error: 'Требуется авторизация' }, { status: 401 });
    }
    const id = context.params?.id ?? getIdFromUrl(request.url);
    if (!id) {
      return Response.json({ error: 'ID не указан' }, { status: 400 });
    }
    await deleteLead(id);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: 'Ошибка удаления' }, { status: 500 });
  }
}
