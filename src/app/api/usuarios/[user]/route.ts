import { NextResponse } from "next/server";
import { query } from '../../../../../lib/db'

export async function GET(request: Request, {params} : {params: any}) {
  let usuario = JSON.parse(params.user);
  const email = usuario.email;
  const password = usuario.password;
  const results = await query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
  return NextResponse.json({ message: 'usuario', results })
}
