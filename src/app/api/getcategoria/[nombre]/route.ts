import { NextResponse } from "next/server";
import { query } from '../../../../../lib/db'

export async function GET(request: Request, {params} : {params: any}) {
  try {
    const nombre = '/'+params.nombre;
    const results = await query('SELECT * FROM categorias WHERE link = ?', [nombre]) as any[];
    if (!results || results.length === 0 || !results[0]?.id) {
      return NextResponse.json({ message: 'categoria not found', results: [], webinars: [] }, { status: 404 });
    }
    // Convert RowDataPacket to plain object for accessing id
    const categoria = JSON.parse(JSON.stringify(results[0]));
    const categoriaId = Number(categoria.id);
    const results2 = await query('SELECT * FROM webinars WHERE id_categoria = ?', [categoriaId]) as any[];
    // Convert RowDataPacket objects to plain JavaScript objects
    const webinars = JSON.parse(JSON.stringify(results2 || []));
    return NextResponse.json({ message: 'categoria', webinars, categoria: categoria });
  } catch (error: any) {
    console.error('Error in getcategoria:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [], webinars: [] }, { status: 500 });
  }
}
