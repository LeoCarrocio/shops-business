import { FC } from 'react';
import { Typography, Grid, Card, CardActionArea, CardMedia } from '@mui/material';

import{ IProduct } from './../../interfaces';
import { ProductCard } from './ProductCard';

 interface ProductListProps{
  products: IProduct[];
 }

export const ProductList:FC<ProductListProps> = ({products}) => {
  return (
    <Grid container spacing={4}>
        {
          products.map(product =>(
            <ProductCard  product={product} key={product.slug}/>
             
          ))
        }
      </Grid>

    
  )
}
