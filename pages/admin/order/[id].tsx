import React from 'react'
import { AdminLayout } from '../../../components/layout';
import {CartList, OrderSummary} from '../../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Chip } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces'; 



interface Props{
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {

  const { shippingAddres } = order;

  
  return (
    <AdminLayout 
        title='Resumen de la orden' 
        subtitle={ `OrdenId: ${ order._id }`}
        icon={ <AirplaneTicketOutlined /> }
    >

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
                
                <Box display='flex' justifyContent='center' flexDirection='column' >
                
                  {
                    order.isPaid ? (
                      <Chip 
                          sx={{my:2}}
                          label='Pagado'
                          variant='outlined'
                          color='success'
                          icon={<CreditScoreOutlined />}
                          />
                          ) : ( 
                            <Chip 
                            sx={{ my: 2, flex: 1 }}
                            label="Pendiente de pago"
                            variant='outlined'
                            color="error"
                            icon={ <CreditCardOffOutlined /> }
                      />
                      
                    ) 
                  }
                  </Box>
                </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid> 

      </AdminLayout>
    )
}
// esto lo hago del lado del back, server side rendering
export const getServerSideProps: GetServerSideProps = async ({req, query}) =>{

  const {id = ''} = query;
  const session:any = await getSession({req});

  const order = await dbOrders.getOrderbyId(id.toString());

  if(!order){
    return {
      redirect:{
        destination:'admin/orders',
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