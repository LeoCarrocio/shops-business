import React from 'react';
import { ShopLayout } from '../../components/layout';
import {CartList} from '../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Button} from '@mui/material';

const CartPage = () => {
  return (

    <ShopLayout title={'Carrito - 3 -  '} pageDescription={'Carrito de compras de la tienda'} >
      <Typography variant="h1" component='h1'> CARRITO </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{my:1}}/>

              { /* Orden Sumary => falta haer  */}
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