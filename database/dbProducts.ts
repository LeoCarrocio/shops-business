import { Product } from "../model"
import { db } from "./"
import { IProduct } from '../interfaces/products';

export const getProductsBySlug = async(slug : string): Promise<IProduct | null> => {

  await db.connect()

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect()

  if( !product ) return null;

  product.images = product.images.map( image => {
    return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
});

  return JSON.parse(JSON.stringify(product));

}

interface ProductSlugs { 
  slug:string
}

export const getAllProductSlugs = async(): Promise<ProductSlugs[]> => {

  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
}

export const getProductByTerm = async (term: string): Promise<IProduct[]> => {

  term = term.toString().toLowerCase();
  console.log(term)
  await db.connect();

  const product = await Product.find({
    $text : { $search: term }
  })
  .select('title images price inStock slug -_id')
  .lean();
  
  await db.disconnect()

  const updatedProducts = product.map( prod => {
    prod.images = prod.images.map( image => {
        return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
    });

    return prod;
})

  //return JSON.parse(JSON.stringify(product));
  return updatedProducts;

}

export const getAllProducts = async ():Promise<IProduct[]> =>{

  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();

  const updatedProducts = products.map( prod => {
    prod.images = prod.images.map( image => {
        return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
    });

    return prod;
})

  return JSON.parse(JSON.stringify(updatedProducts));
}