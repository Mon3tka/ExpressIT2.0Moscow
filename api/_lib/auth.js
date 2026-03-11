import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'expressit-jwt-secret-change-in-production';

export function verifyToken(authHeader) {
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function signToken() {
  return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '7d' });
}
