import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../model'
import { IProduct } from '../../../interfaces'

type Data = { message: string } | IProduct[];

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method){
    case 'GET':
      return searchProduct(req, res)

    default:
      return res.status(400).json({message: 'Bad request'})
  }
}



const searchProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{


  let { query ='' } = req.query;

  if(query.length === 0 ){
    return res.status(400).json({message: 'Debe especificar la query de busqueda'})
  }

  query = query.toString().toLowerCase()


  
  await db.connect()
  const products = await Product.find({

    $text : { $search: query } // mando mi busqueda de varios indices, fijarme en el modelo q se llaman text y con eso vincula las columnas donde deve hacer la busqueda 
  
  })
  .select('title images price inStock slug -_id')
  .lean();
  await db.disconnect()

  if(!products){
    return res.status(400).json({message: 'Producto no encontrado'})
  }

  return res.status(200).json(products);

}

