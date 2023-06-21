import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces/order';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { Product, Order } from '../../../model';

type Data = { message: string } | IOrder

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch(req.method){
    case 'POST':
      return createOrder(req, res);
    
    default:
      return res.status(400).json({ message: 'Bad request' })
  }

}



const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {orderItems, total } = req.body  as IOrder;


  
  try {
  // vericamos q tengamos un usuario 
  const session = await getSession({ req });

  if(!session){
    return res.status(401).json({message:'Debe estar autenticado'})
  }

  // hago la sumatoria de los precios de los productos, los tenog q ir a buscar ala db xq no se confia en el front 
  const productsIds = orderItems.map(product => product._id);

  const dbProducts= await Product.find({_id:{$in: productsIds}})

    const subTotal = orderItems.reduce((prev, current)=> {
      const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price // verifico que el precio exita y no halla manipulacion, con los precios de ciurreprice hago la sumatoria  
      if(!currentPrice){
        throw new Error('Verifique el carrito de nuevo, producto no existe')
      }
      return (currentPrice * current.quantity) + prev
    },0)

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 1);
    const backendTotal = subTotal * (taxRate + 1)

    if(backendTotal !== total ){
      throw new Error('El total difiere del lado del servidor')
    }

    // hasta aca todo esta bien, al llegar a este punto 
    const userId = session.user._id! ;
    const newOrder = new Order({...req.body, isPaid :false, user: userId})
    newOrder.total = Math.round(newOrder.total * 100)/100 ;

    await newOrder.save(); 

    db.connect();

    res.status(201).json(newOrder);
    
  } catch (error:any) {
      db.connect(); 
      console.log(error);
      return res.status(400).json({
        message: error.message || 'Revise logs del servidor'
      })

  }
  
  db.disconnect();








  return res.status(201).json({message: 'ok '})
}

