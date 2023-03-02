import NextLink from 'next/link';
import { ShopLayout } from '../../components/layout';
import {CartList, OrderSummary} from '../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Link} from '@mui/material';
import { CartContext } from '../../context';
import React, { useContext } from 'react'
import { countries } from '../../utils';


const summaryPage = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {shippinAddress,  numberOfItems} = useContext(CartContext)

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
              <Typography>{countries.find(coun => coun.code === country )?.name}</Typography> 
              <Typography>{phone}</Typography> 

              <Divider sx={{my:1}}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'> Editar</Link>
                </NextLink>
              </Box>
            
              <OrderSummary/>
              
              <Box sx={{mt:3}}>
                <Button color="secondary" className='circular-btn' fullWidth>
                  Confirmar orden
                </Button>

              </Box>

            </CardContent>

          </Card>

        </Grid>
      </Grid> 

      
    </ShopLayout>
  )
}

export default summaryPage