import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/product/ProductList';
import {useProducts} from '../../hooks'
import {FullScreemLoading} from '../../components/ui'
/*
import {IProduct} from '../interfaces'
import { initialData } from '../database/products';
*/
import { Typography} from '@mui/material';


const KidCategoryPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=kid');

  return (
    <ShopLayout title={'Kids'} pageDescription={'Productos de niños'}>
      <Typography variant='h1' component='h1' > KIDS  </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos par niños  </Typography>

      {
        isLoading ? <FullScreemLoading /> :  <ProductList products={ products }/>
      }

    </ShopLayout>
  )
}

export default KidCategoryPage