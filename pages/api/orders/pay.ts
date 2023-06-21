import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { IPaypal } from '../../../interfaces';
import { db } from '../../../database';
import { Order } from '../../../model';

type Data = {
  message : string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch(req.method) {

    case 'POST':
      return payOrder(req, res);

    default:
      res.status(400).json({ message: 'Bad request' })
  }

}

const getPaypalBearerToken = async():Promise<string|null> =>{
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64TOkens = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

// el body tiene q estar en este formato => application/x-www-form-urlencoded , asi lo pide Paypal
  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post( process.env.PAYPAL_OAUTH_URL || '' , body, { 
      headers: { 
        'Authorization':`Basic ${base64TOkens}`,
        'Content-Type':'application/x-www-form-urlencoded'
      }
    });

    return data.access_token;
    
  } catch (error) {
    
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
    }else{
      console.log(error)
    }
    return null
  }
}




const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO:
  // validar -> seccion del usuario
  // validar -> id de mongo 

  // clase 341

  // 1 conseguir un token para pegarle a la api de Paypal y verificar si fue pagada la orden o no.
  const paypalBearerToken = await getPaypalBearerToken();

  if(!paypalBearerToken){
    res.status(400).json({ message: 'No se pudo general token de Paypal' })
  }

  const {transactionId = '', orderId ='' } = req.body;
  // 2 .con la url busco los datos de la trasaccion y verifico datos 
  const {data} = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
    headers:{
      'Authorization' : `Bearer ${paypalBearerToken}`  
    }
  })

  if(data.status !== 'COMPLETED'){
    res.status(400).json({ message: 'Orden no reconocida' })
  }

  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if(!dbOrder){
    await db.disconnect();
    return res.status(404).json({ message: 'Orden no existe en nuestar base de datos'})
  }

  if(dbOrder.total !== Number(data.purchase_units[0].amount.value)){
    await db.disconnect();
    return res.status(404).json({ message: 'Los montos de Paypal y nuestra orden no son iguales'})
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true ;

  await dbOrder.save();

  await db.disconnect();

  res.status(200).json({ message: 'Orden Pagada' })
}
