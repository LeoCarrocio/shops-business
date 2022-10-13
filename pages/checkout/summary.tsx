import NextLink from 'next/link';
import { ShopLayout } from '../../components/layout';
import {CartList, OrderSummary} from '../../components/cart'
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Link} from '@mui/material';


const summaryPage = () => {
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
              <Typography variant='h2'>Resumen ( 3 productos )</Typography>

              <Divider sx={{my:1}}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'> Editar</Link>
                </NextLink>
              </Box>

              <Typography variant='subtitle1'>Direccion de entraga</Typography>
              <Typography>Leonardo G. Carrocio</Typography>
              <Typography>Algun lugar </Typography>
              <Typography>Bueno Aires, Malvinas Argentinas</Typography>
              <Typography>123128098</Typography>
              <Typography>valparaiso 987</Typography>

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