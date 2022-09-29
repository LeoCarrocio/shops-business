import { Typography } from '@mui/material';
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layout';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Home'} pageDescription={'la mejor pagina '}>
      <Typography variant='h1' component='h1' > bussines  </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos   </Typography>
    </ShopLayout>
  )
}

export default Home
