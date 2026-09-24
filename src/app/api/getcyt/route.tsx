import { NextResponse } from "next/server";
import { query } from '../../../../lib/dbbb'

export async function GET(request: Request, {params} : {params: any}) {
  try {
    const results = await query('SELECT * FROM cyt ORDER BY id') as any[];
    return NextResponse.json({ message: 'cyt', results });
  } catch (error: any) {
    console.error('Error in getcyt:', error);
    return NextResponse.json({ message: 'error', error: error.message, results: [], webinars: [] }, { status: 500 });
  }
}
