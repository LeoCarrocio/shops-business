// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { messaje: string }

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  
  res.status(400).json({ messaje: 'Debe especificar la query de busqueda' });
}
