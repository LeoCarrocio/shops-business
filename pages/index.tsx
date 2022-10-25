import type { NextPage } from 'next'
import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/product/ProductList';
import {useProducts} from '../hooks'
import {FullScreemLoading} from '../components/ui'
/*
import {IProduct} from '../interfaces'
import { initialData } from '../database/products';
*/

import { Typography} from '@mui/material';


const Home: NextPage = () => {

  const {products, isLoading, isError} = useProducts('/products');

  return (
    <ShopLayout title={'Home'} pageDescription={'la mejor pagina '}>
      <Typography variant='h1' component='h1' > bussines  </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos   </Typography>

      {
        isLoading ? <FullScreemLoading /> :  <ProductList products={ products }/>
      }

    </ShopLayout>
  )
}

export default Home
