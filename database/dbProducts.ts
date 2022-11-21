import { Product } from "../model"
import { db } from "./"
import { IProduct } from '../interfaces/products';

export const getProductsBySlug = async(slug : string): Promise<IProduct | null> => {

  await db.connect()

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect()

  if( !product ) return null;

  return JSON.parse(JSON.stringify(product));

}