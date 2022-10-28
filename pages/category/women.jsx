import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/product/ProductList';
import {useProducts} from '../../hooks'
import {FullScreemLoading} from '../../components/ui'
/*
import {IProduct} from '../interfaces'
import { initialData } from '../database/products';
*/
import { Typography} from '@mui/material';


const WomenCategoryPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=women');

  return (
    <ShopLayout title={' Women'} pageDescription={'la mejor pagina de produstos de mujeres'}>
      <Typography variant='h1' component='h1' > Mujeres  </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos de Mujeres  </Typography>

      {
        isLoading ? <FullScreemLoading /> :  <ProductList products={ products }/>
      }

    </ShopLayout>
  )
}

export default WomenCategoryPage