import { NextResponse } from "next/server";
import { query } from '../../../../lib/db'

// Las credenciales viajan en el cuerpo (POST), nunca en la URL,
// y solo se devuelven los campos que el cliente necesita.
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Solicitud inválida' }, { status: 400 });
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!email || !password) {
    return NextResponse.json({ message: 'Correo y contraseña son obligatorios' }, { status: 400 });
  }

  try {
    const results: any = await query(
      'SELECT id, email, tipo FROM usuarios WHERE email = ? AND password = ? LIMIT 1',
      [email, password]
    );
    if (!results || results.length === 0) {
      return NextResponse.json({ message: 'Usuario y/o contraseña incorrectos' }, { status: 401 });
    }
    const { id, email: correo, tipo } = results[0];
    return NextResponse.json({ usuario: { id, email: correo, tipo } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'No fue posible iniciar sesión, intente más tarde' }, { status: 500 });
  }
}
