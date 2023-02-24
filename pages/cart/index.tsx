import React from 'react';
import { ShopLayout } from '../../components/layout';
import {CartList, OrderSummary} from '../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Button} from '@mui/material';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';

const CartPage = () => {

  const {isLoaded, cart} = useContext(CartContext);
  const router = useRouter();

  useEffect(()=>{
    if( isLoaded && cart.length === 0 ){ // lo saco de la oagina de carrito xq no tiene productos cargados 
      router.replace('/cart/empty') // el .raplace remplaza la ruta y no gurda donde esta actualmente  
    }

  },[isLoaded, cart, router])


  if(!isLoaded || cart.length === 0 ){ // como se ve algo del carrito pero es infimo, con esta condicion lo evitamos 
    return <></>
  }


  return (

    <ShopLayout title={'Carrito - 3 -  '} pageDescription={'Carrito de compras de la tienda'} >
      <Typography variant="h1" component='h1'> CARRITO </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>

              <Divider sx={{my:1}}/>
              
              <OrderSummary/>
              
              <Box sx={{mt:3}}>
                <Button color="secondary" className='circular-btn' fullWidth>
                  Chackout
                </Button>

              </Box>

            </CardContent>

          </Card>

        </Grid>
      </Grid> 

      
    </ShopLayout>

  )
}

export default CartPage