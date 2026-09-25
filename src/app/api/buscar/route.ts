import { NextResponse } from "next/server";
import { query as queryContenido } from '../../../../lib/dbb'
import { query as queryLideres } from '../../../../lib/dbbb'

// Siempre consulta la base de datos para que el buscador refleje los cambios sin volver a compilar
export const dynamic = 'force-dynamic';

// Mismo slug que usa /lideres-de-la-construccion para armar el enlace a cada líder
const slug = (nombre: string) => nombre.toLowerCase().replaceAll('.','').replaceAll(' ', '-');

// Índice para el buscador del encabezado: categorías, cursos y líderes, cada uno con su enlace
export async function GET() {
  try {
    const [categorias, cursos, lideres] = await Promise.all([
      queryContenido('SELECT id, nombre, url, tipo FROM categorias2026') as Promise<any[]>,
      queryContenido('SELECT id, id_categoria, nombre, url, modulo FROM contenido2026') as Promise<any[]>,
      // Si falla la base de datos de líderes, el buscador sigue funcionando con el resto
      (queryLideres('SELECT id, nombre FROM lideres ORDER BY id') as Promise<any[]>).catch((error) => {
        console.error('Error in buscar (lideres):', error);
        return [];
      }),
    ]);

    const categoriaPorId = new Map(categorias.map((c) => [String(c.id), c]));

    const resultados = [
      ...categorias.map((c) => ({
        tipo: 'Categoría',
        titulo: c.nombre,
        href: c.tipo === 'superior' ? `/categorias/${c.url}` : `/${c.url}`,
      })),
      ...cursos.flatMap((curso) => {
        const categoria = categoriaPorId.get(String(curso.id_categoria));
        if (!categoria) return [];
        return [{
          tipo: 'Curso',
          titulo: curso.nombre,
          detalle: categoria.nombre,
          href: `/categorias/${categoria.url}/${curso.url}/${curso.modulo ? 'modulos' : 'presentación-ejecutiva'}`,
        }];
      }),
      ...lideres.map((l) => ({
        tipo: 'Líder',
        titulo: l.nombre,
        href: `/lideres-de-la-construccion/${slug(l.nombre)}`,
      })),
    ];

    return NextResponse.json({ message: 'buscar', results: resultados });
  } catch (error: any) {
    console.error('Error in buscar:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [] }, { status: 500 });
  }
}
