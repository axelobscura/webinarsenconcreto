import { NextResponse } from "next/server";
import { query } from '../../../../../lib/dbb'

export async function GET(request: Request, {params} : {params: any}) {
  try {
    const results = await query('SELECT * FROM contenido WHERE url = ?', [params.nombre]) as any[];
    return NextResponse.json({ message: 'webinar', results });
  } catch (error: any) {
    console.error('Error in getcategoria:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [], webinars: [] }, { status: 500 });
  }
}
