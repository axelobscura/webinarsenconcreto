import { NextApiHandler } from 'next'
import { query } from '../../../../lib/db'

console.log('hola');

export async function GET(request: Request) {
  try {
    const results = await query('SELECT * FROM lideres');
    //console.log(JSON.stringify(results));
    //return JSON.stringify(results);
    return new Response(JSON.stringify(results));
  } catch ( error ) {
    console.log( error );
  }
}