import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../model'
import { IProduct } from '../../../interfaces'

type Data = { message: string } | IProduct;

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method){
    case 'GET':
      return getProduct(req, res)

    default:
      return res.status(400).json({message: 'Bad request'})
  }
}



const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
//(VIDEO 208)

  const { slug } = req.query;
  
  await db.connect()
  const products = await Product.findOne({slug}).lean();
  await db.disconnect()

  if(!products){
    return res.status(400).json({message: 'Producto no encontrado'})
  }

  return res.status(200).json(products);

}

