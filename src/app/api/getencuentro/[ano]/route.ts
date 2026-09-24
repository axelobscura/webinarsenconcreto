import { NextResponse } from "next/server";
import { query } from '../../../../../lib/dbbb'

// El nombre de tabla no se puede pasar como parámetro de la consulta, por eso solo se aceptan estos
const tablas: { [ano: string]: string } = {
  '2017': 'encuentro2017',
  '2019': 'encuentro2019',
  '2022': 'encuentro2022',
};

export async function GET(request: Request, {params} : {params: any}) {
  const tabla = tablas[params.ano];
  if (!tabla) {
    return NextResponse.json({ message: 'encuentro not found', results: [] }, { status: 404 });
  }
  try {
    const results = await query(`SELECT * FROM ${tabla} ORDER BY id`) as any[];
    return NextResponse.json({ message: tabla, results });
  } catch (error: any) {
    console.error('Error in getencuentro:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [] }, { status: 500 });
  }
}
