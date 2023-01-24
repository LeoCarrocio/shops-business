import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/product/ProductList';
import {useProducts} from '../../hooks'
import {FullScreemLoading} from '../../components/ui'
/*
import {IProduct} from '../interfaces'
import { initialData } from '../database/products';
*/

import { Typography} from '@mui/material';


const SearchHomePage: NextPage = () => {

  // podriamos utilizar esto y funcinaria muy bien ya que saco la busqieda por la direccion pero lo bamos hacer mejor con la kukies, (video 229)
  const {products, isLoading, isError} = useProducts('/search/camisetas'); 

  return (
    <ShopLayout title={'Home - Search '} pageDescription={'Busqueda de producto '}>
      <Typography variant='h1' component='h1' > Buscar  Producto </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos Buscado.... </Typography>

      {
        isLoading ? <FullScreemLoading /> :  <ProductList products={ products }/>
      }

    </ShopLayout>
  )
}

export default SearchHomePage;
