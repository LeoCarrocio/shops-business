import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../model'
import { IProduct } from '../../../interfaces'

type Data = { message: string } | IProduct[];

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method){
    case 'GET':
      return getProducts(req, res)

    default:
      return res.status(400).json({message: 'Bad request'})
  }
}



const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{


  const { gender = 'all' } = req.query;

  let conditions = {}

  if(gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ){
    conditions = { gender }
  }

  await db.connect()
  const products = await Product.find(conditions)// le mando las condicones de busqueda
                                .select('title images price inStock slug')// solamente elijo los parametros que nesesito 
                                .lean();
  await db.disconnect()

  return res.status(200).json(products);

}

