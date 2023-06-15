import React from 'react'
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layout';
import {CartList, OrderSummary} from '../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Link, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


interface Props{
  order: IOrder;
}


const OrderPage: NextPage<Props> = ({order}) => {

  const { shippingAddres } = order;


  return (
    <ShopLayout title={'Resumen de la orden'} pageDescription={'Resumen de la orden '} >
      <Typography variant="h1" component='h1'> Orden: {order._id}</Typography>

        {
          order.isPaid ? (
            <Chip 
              sx={{my:2}}
              label='Pagado'
              variant='outlined'
              color='success'
              icon={<CreditScoreOutlined />}
            />
          ):(
            <Chip 
              sx={{my:2}}
              label='Pendiente de pago'
              variant='outlined'
              color='error'
              icon={<CreditCardOffOutlined />}
            />
          )
        }
      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems}/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({order.numberOfOrderItems} {order.numberOfOrderItems > 1 ? 'Productos' : 'Producto' })</Typography>

              <Divider sx={{my:1}}/>

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Direccion de entrega</Typography>
              </Box>
              <Typography>{shippingAddres.firstName} {shippingAddres.lastName}</Typography>
              <Typography>{shippingAddres.address}</Typography>
              <Typography>{shippingAddres.city}</Typography>
              <Typography>{shippingAddres.country}</Typography>
              <Typography>{shippingAddres.phone}</Typography>

              <Divider sx={{my:1}}/>

              <OrderSummary orderValues = {{
                  numberOfItems : order.numberOfOrderItems, 
                  subTotal : order.subTotal, 
                  tax : order.tax, 
                  total : order.total
                }} 
              />
              
              <Box sx={{mt:3}} display='flex' flexDirection='column' >
                {
                  order.isPaid ? (
                    <Chip 
                        sx={{my:2}}
                        label='Pagado'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                    />
                    ) : ( <h1>Pagar</h1>) 
                }
              </Box>

            </CardContent>

          </Card>

        </Grid>
      </Grid> 

      
    </ShopLayout>
  )
}
// esto lo hago del lado del back, server side rendering
export const getServerSideProps: GetServerSideProps = async ({req, query}) =>{

  const {id = ''} = query;
  const session:any = await getSession({req});

  if(!session){ // si no hay sessionlo hago que se loguee x expiro o demas factores
    return{
      redirect:{
        destination:`auth/login?p=/order/${id}`,
        permanent:false,
      }
    }
  }
  // teenmos un seccion valida y 
  // como ya estamos en el back, se puede llamr directmente al id de la orden, sin hacer un llamado al mismo back
  const order = await dbOrders.getOrderbyId(id.toString());

  if(!order){
    return {
      redirect:{
        destination:'order/history',
        permanent:false,
      }
    }
  }

  if(order.user !== session.user._id){
    return {
      redirect:{
        destination:'order/history',
        permanent:false,
      }
    }
  }

  return{
    props:{
      order
    }
  }
}



export default OrderPage;