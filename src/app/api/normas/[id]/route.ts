import { NextResponse } from "next/server";
import { query } from '../../../../../lib/db'

export async function GET(request: Request, {params} : {params: any}) {
  const id = params.id;
  const results = await query('SELECT * FROM normas WHERE id_categoria = ?', [id]);
  return NextResponse.json({ message: 'normas', results })
}
