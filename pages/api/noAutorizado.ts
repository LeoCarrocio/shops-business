import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string }


export default function handler(req: NextApiRequest, res:NextApiResponse<Data>) {
  res.status(401).json({ message: 'No autorizado'})
}


//   return new Response( JSON.stringify({ message: 'No autorizado' }), {
//     status: 401,
//     headers: {
//         'Content-Type':'application/json'
//     }
// });