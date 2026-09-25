import { NextApiHandler } from 'next'
import { query } from '../../../../lib/dbb'

export async function GET(request: Request) {
  try {
    const webinar = new URL(request.url).searchParams.get('webinar');
    const results = await query(`SELECT * FROM preguntas${webinar}`);
    return new Response(JSON.stringify(results));
  } catch ( error ) {
    console.log( error );
  }
}
