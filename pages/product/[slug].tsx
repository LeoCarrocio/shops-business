import { FC } from 'react';
import { ShopLayout } from "../../components/layout"
import {ItemCounter} from '../../components/ui'
import { IProduct } from '../../interfaces'

import { initialData } from '../../database/products';
import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { ProductSlideShow } from '../../components/product/ProductSlideShow';
import { SizeSelectors } from '../../components/product';
import { useRouter } from 'next/router';
import { useProducts } from '../../hooks';
import { NextPage,GetServerSideProps } from 'next';
import { dbProducts } from '../../database';


//const product = initialData.products[0]

interface ProductPageProps{
  product: IProduct
}
 
const ProductPage:NextPage<ProductPageProps> = ({product}) => {

  // Esta es una forma de hacerlo q no seria la mas optima, ya q llmaria muchas veses x cada producto al back
  // y no estariamos aprovechando las vondades de next, y el promebla q google crom no lee esto y no tenemos el seo para los motores de google 
  // const router = useRouter();
  // const { product: IProduct, isLoading, isError } = useProducts(`/products/${router.query.slug}`)
  // si loading en treu, me mostriaria cargando .... osea espera para cargar y POR ESOS AL PRINCIPIO TRAERIA MUCHOS ERRORE  
  // if(isLoading){
  //   return <h1> CARGANDO ... </h1>
  // }


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

//esta vercion la hacemos con  getServerSideProps, que lo llama del lado del servidor y no del lado del cliente
//import { GetServerSideProps } from 'next';

export const getServerSideProps : GetServerSideProps = async({params}) =>{

  const {slug} = params as {slug:string};
  const product = await dbProducts.getProductsBySlug(slug);

  if(!product){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

  return{ 
    props:{
      product
    }
  }
}




export default ProductPage