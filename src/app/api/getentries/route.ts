import { NextApiHandler } from 'next'
import { query } from '../../../../lib/db'

export default async function handler(req: any, res: any) {
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
