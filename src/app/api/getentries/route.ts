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

/*
export async function getUser() {
  try {
    const results = await query('SELECT * FROM lideres');
    //console.log(JSON.stringify(results));
    return JSON.stringify(results);
  } catch ( error ) {
    console.log( error );
  }
}

getUser();
*/

/*
export async function GET(request: Request) {
  console.log('hola');
  
  try {
    const results = await query(`SELECT * FROM lideres ORDER BY id DESC LIMIT 10`)
    return JSON.stringify(results);
  } catch (e: any) {
    console.log(e);
  }

  return new Response('Hello, Next tester!')
}
*/
/*
export default async function handler(req: any, res: any) {
  return res.json('hola');
  if (req.method === 'GET') {
    console.log('hola');
    try {
      const results = await query(`
        SELECT * FROM lideres ORDER BY id DESC LIMIT 10`)
      return res.json(results)
    } catch (e: any) {
      res.status(500).json({ message: e.message })
    }
  } else {
    // Handle any other HTTP method
  }
}
*/
