import { NextResponse } from "next/server";
import { query } from '../../../../lib/dbbb'

export async function GET(request: Request, {params} : {params: any}) {
  try {
    const results = await query('SELECT * FROM lideres ORDER BY id') as any[];
    return NextResponse.json({ message: 'lideres', results });
  } catch (error: any) {
    console.error('Error in getlideres:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [], webinars: [] }, { status: 500 });
  }
}
