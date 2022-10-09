import { FC } from 'react';
import { ShopLayout } from "../../components/layout"
import {ItemCounter} from '../../components/ui'
import { IProduct } from './../../interfaces'

import { initialData } from '../../database/products';
import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { ProductSlideShow } from '../../components/product/ProductSlideShow';
import { SizeSelectors } from '../../components/product';


const product = initialData.products[0]
/*
interface ShopLayoutProps{
  product: IProduct
}
*/
 
const ProductPage:FC = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3} >

        <Grid item xs={12} sm={7} >
          <ProductSlideShow
            images={product.images}
          />

        </Grid>
        
        <Grid item xs={12} sm={5} >
          <Box display='flex' flexDirection='column' >
            {/* title */}
            <Typography variant='h1' component='h1'> {product.title} </Typography> 
            <Typography variant='subtitle1' component='h2'>$ {product.price} </Typography>  
            
            {/* Cantidad */}
            <Box sx={{my:2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter/>
              <SizeSelectors 
                //selectedSize={product.sizes[0]}
                sizes={product.sizes} 
              />
            </Box>

            {/*  agregar carrito */}
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito 
            </Button> 

            {/*<Chip label='No hay Productos' color='error' variant='outlined'/> */}

            {/* Description  */}
            <Box sx={{mt:3}}>
              <Typography variant='subtitle2'> Description </Typography> 
              <Typography variant='body2'> {product.description} </Typography>  
            </Box>
 
          </Box>
        </Grid>


      </Grid>
    </ShopLayout>

  )
}

export default ProductPage