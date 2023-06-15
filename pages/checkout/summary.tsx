import NextLink from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layout';
import {CartList, OrderSummary} from '../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Link, Chip} from '@mui/material';
import { countries } from '../../utils';
import Cookies from 'js-cookie';
import { truncate } from 'fs';


const SummaryPage = () => {

  const router = useRouter();

  const {shippinAddress,  numberOfItems, creatOrder} = useContext(CartContext);
  const [isPosting , setIsPosting] = useState<boolean>(false);
  const [errorMessage , setErrorMessage] = useState<string>('');


  useEffect(()=>{
    if(!Cookies.get('firstName')){
      router.push('/checkout/address')
    }

  },[router])

  const onCreatedOrder = async () => {
    setIsPosting(true);
    const {hasError, message}= await creatOrder();

    if(hasError) {
      setErrorMessage(message);
      setIsPosting(false);
      return; 
    }

    router.replace(`/order/${message}`);

  }



  if(!shippinAddress){
    return <> </>
  }

  const { firstName, lastName, address, zip, city, country , phone, address2 } = shippinAddress;

  return (
    <ShopLayout title={'Resumen de compra '} pageDescription={'Resumen de la orden '} >
      <Typography variant="h1" component='h1'> Resumen de la orden  </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ( { numberOfItems } {numberOfItems === 1 ? ' producto ' : ' productos ' } )</Typography>

              <Divider sx={{my:1}}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'> Editar</Link>
                </NextLink>
              </Box>

              <Typography variant='subtitle1'>Direccion de entraga</Typography>
              <Typography>{firstName} {lastName}</Typography>
              <Typography>{address}</Typography>
              {
                address2 && <Typography>{address2}</Typography>
              }
              <Typography>{city}</Typography>
              {/* <Typography>{countries.find(coun => coun.code === country )?.name}</Typography>  */}
              <Typography>{country}</Typography>  
              <Typography>{phone}</Typography> 

              <Divider sx={{my:1}}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'> Editar</Link>
                </NextLink>
              </Box>
            
              <OrderSummary/>
              
              <Box sx={{mt:3}} display='flex' flexDirection='column'>
                <Button color="secondary" 
                  className='circular-btn' 
                  fullWidth 
                  onClick={()=> onCreatedOrder() }
                  disabled={isPosting}
                >
                  Confirmar orden
                </Button>
                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{display: errorMessage ? 'flex' : 'none', mt:2}}
                />
              </Box>

            </CardContent>

          </Card>

        </Grid>
      </Grid> 

      
    </ShopLayout>
  )
}

export default SummaryPage; 