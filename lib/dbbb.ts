import mysql from 'serverless-mysql'

export const dbb = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE_C,
    user: process.env.MYSQL_USERNAME_C,
    password: process.env.MYSQL_PASSWORD_C,
  },
})

export async function query(
  q: string,
  values: (string | number)[] | string | number = []
) {
  try {
    const results = await dbb.query(q, values)
    await dbb.end()
    return results
  } catch (e: any) {
    throw Error(e.message)
  }
}