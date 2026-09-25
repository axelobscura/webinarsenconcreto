import { NextResponse } from "next/server";
import { query } from '../../../../../lib/dbb'

export async function GET(request: Request, {params} : {params: any}) {
  try {
    const results = await query('SELECT * FROM videos WHERE id_contenido = ?', [params.id]) as any[];
    return NextResponse.json({ message: 'tipo', results });
  } catch (error: any) {
    console.error('Error in getvideo:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [], webinars: [] }, { status: 500 });
  }
}
