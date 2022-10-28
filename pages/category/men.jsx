import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/product/ProductList';
import {useProducts} from '../../hooks'
import {FullScreemLoading} from '../../components/ui'
/*
import {IProduct} from '../interfaces'
import { initialData } from '../database/products';
*/
import { Typography} from '@mui/material';


const MenCategoryPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=men');

  return (
    <ShopLayout title={'Men'} pageDescription={'la mejor pagina '}>
      <Typography variant='h1' component='h1' > HOMBRES  </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos sobre HOMBRES  </Typography>

      {
        isLoading ? <FullScreemLoading /> :  <ProductList products={ products }/>
      }

    </ShopLayout>
  )
}

export default MenCategoryPage