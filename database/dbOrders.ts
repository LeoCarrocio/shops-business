import { isValidObjectId } from 'mongoose';
import { IOrder } from '../interfaces/order';
import { db } from '.';
import { Order } from '../model';

export const getOrderbyId = async (id:string):Promise<IOrder| null> => {

  if(!isValidObjectId(id)){
    return null
  }

  await db.connect();

  const order = await Order.findById(id).lean();

  await  db.disconnect();

  if(!order){
    return null;
  }
  
  return JSON.parse(JSON.stringify(order)); // se hace esto para serializar y no hacerlo manual 

} 

export const getOrderByUser = async (userId: string): Promise<IOrder[]> =>{

  if(!isValidObjectId(userId)){
    return []
  }

  await db.connect();

  const orders = await Order.find({userId: userId}).lean();

  await  db.disconnect();

  return JSON.parse(JSON.stringify(orders)); // se hace esto para serializar y no hacerlo manual 

}