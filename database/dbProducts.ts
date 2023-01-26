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

interface ProductSlugs { 
  slug:string
}

export const getAllProductSlugs = async(): Promise<ProductSlugs[]> => {

  await db.connect();
  const slugs = await Product.find().select('slug - _id').lean();
  await db.disconnect();

  return slugs;
}

export const getProductByTerm = async (term: string): Promise<IProduct[]> => {

  term = term.toString().toLowerCase();

  await db.connect();

  const product = await Product.find({
    $text : { $search: term }
  })
  .select('title images price inStock slug -id')
  .lean();

  await db.disconnect()

  return product;

}