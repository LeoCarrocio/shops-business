import React ,{useState}from 'react'
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layout';
import {CartList, OrderSummary} from '../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Link, Chip, CircularProgress } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { tesloApi } from '../../api';
import { useRouter } from 'next/router';



interface Props{
  order: IOrder;
}

export type OrderResponseBody = {
  id: string;
  status:
    |'COMPLETED'
    |'SAVED'
    |'APPROVED'
    |'VOIDED'
    |'PAYER_ACTION_REQUIRED';
} 


const OrderPage: NextPage<Props> = ({order}) => {

  const router = useRouter();
  const { shippingAddres } = order;

  const [isPaying, setIsPaying] = useState<boolean>(false);

  const onOrderCompleted = async ( details: OrderResponseBody ) => {

    if( details.status !== 'COMPLETED' ){
      return alert('NO HAY PAGO EN PAYPAL')
    }

    setIsPaying(true);

    try {

      const { data } = await tesloApi.post(`/orders/pay`, {
          transactionId: details.id,
          orderId: order._id
      })

      router.reload();
      
    } catch (error) {
      setIsPaying(false);
      console.log(error)
      alert('ERROR')
    }
  }


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
                
                <Box display='flex' justifyContent='center' className='fadaIn' sx={{display : isPaying ? 'flex': 'none'}} >
                  <CircularProgress />
                </Box>

                <Box flexDirection='column' sx={{display : isPaying ? 'none': 'flex', flex: 1 }}> 

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

                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                              purchase_units: [
                                {
                                    amount: {
                                        value: `${order.total}`,
                                    },
                                },
                              ],
                          } );
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                              onOrderCompleted(details)
                              //console.log({details})
                              //const name = details.payer.name.given_name;
                              //alert(`Transaction completed by ${name}`);
                            });
                          }}
                        />
                    ) 
                  }

                </Box>

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