import type { NextPage } from 'next'
import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/product/ProductList';

import {IProduct} from '../interfaces'
import { initialData } from '../database/products';



import { Typography} from '@mui/material';





const Home: NextPage = () => {
  return (
    <ShopLayout title={'Home'} pageDescription={'la mejor pagina '}>
      <Typography variant='h1' component='h1' > bussines  </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos   </Typography>

      <ProductList products={initialData.products as any}/>

    </ShopLayout>
  )
}

export default Home
