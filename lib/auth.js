import jwt from 'jsonwebtoken';
import { b64, unb64 } from './b64';

const SECRET = 'spr1ngf13ld_s3ss10n';

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export function getAuthUser(request) {
  const token =
    request.cookies?.get?.('token')?.value ||
    request.cookies?.token;

  if (token) {
    const payload = verifyToken(token);
    if (payload) return payload;
  }

  const rememberMe = request.cookies?.get?.('remember_me')?.value || request.cookies?.remember_me;
  if (rememberMe) {
    try {
      const id = parseInt(Buffer.from(rememberMe, 'base64').toString('utf8'), 10);
      if (!isNaN(id)) return { userId: id, fromRememberMe: true };
    } catch {}
  }

  return null;
}

export { b64, unb64 };
