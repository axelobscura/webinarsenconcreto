import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

// Se usa el Pages Router (y no un Route Handler de app/) porque en Next 13.2
// los Route Handlers no leen el cuerpo de las peticiones POST de forma confiable
// en Vercel; el body parser de las API routes clásicas sí funciona en todos lados.
//
// Las credenciales viajan en el cuerpo (POST), nunca en la URL,
// y solo se devuelven los campos que el cliente necesita.

function leerCuerpo(body: unknown): Record<string, unknown> {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return Object.fromEntries(new URLSearchParams(body));
    }
  }
  return typeof body === 'object' ? (body as Record<string, unknown>) : {};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const body = leerCuerpo(req.body);
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }

  try {
    const results: any = await query(
      'SELECT id, email, tipo FROM usuarios WHERE email = ? AND password = ? LIMIT 1',
      [email, password]
    );
    if (!results || results.length === 0) {
      return res.status(401).json({ message: 'Usuario y/o contraseña incorrectos' });
    }
    const { id, email: correo, tipo } = results[0];
    return res.status(200).json({ usuario: { id, email: correo, tipo } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'No fue posible iniciar sesión, intente más tarde' });
  }
}
