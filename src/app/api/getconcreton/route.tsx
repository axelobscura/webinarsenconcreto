import { NextResponse } from "next/server";
import { query } from '../../../../lib/dbb'

export async function GET(request: Request, {params} : {params: any}) {
  try {
    const results = await query('SELECT * FROM concreton ORDER BY id') as any[];
    return NextResponse.json({ message: 'concreton', results });
  } catch (error: any) {
    console.error('Error in getconcreton:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [], webinars: [] }, { status: 500 });
  }
}
