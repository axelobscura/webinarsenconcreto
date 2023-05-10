import { NextApiHandler } from 'next'
import { query } from '../../../../lib/db'

console.log('hola');

export async function GET(request: Request) {
  try {
    const results = await query('SELECT * FROM lideres');
    return new Response(JSON.stringify(results));
  } catch ( error ) {
    console.log( error );
  }
}