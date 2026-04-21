import { NextApiHandler } from 'next'
import { query } from '../../../../lib/dbb'

export async function GET(request: Request) {
  try {
    const results = await query('SELECT * FROM categorias');
    return new Response(JSON.stringify(results));
  } catch ( error ) {
    console.log( error );
  }
}