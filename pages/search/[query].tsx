import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/product/ProductList';
import {useProducts} from '../../hooks'
import {FullScreemLoading} from '../../components/ui'
/*
import {IProduct} from '../interfaces'
import { initialData } from '../database/products';
*/

import { Typography} from '@mui/material';
import Product from '../../model/Product';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';


interface PropsSearchHomePage{
  products: IProduct[]
}


const SearchHomePage: NextPage<PropsSearchHomePage> = ({products}) => {

  // podriamos utilizar esto y funcinaria muy bien ya que saco la busqieda por la direccion pero lo bamos hacer mejor con la kukies, (video 229)
  // const {products, isLoading, isError} = useProducts('/search/camisetas'); 

  return (
    <ShopLayout title={'Home - Search '} pageDescription={'Busqueda de producto '}>
      <Typography variant='h1' component='h1' > Buscar  Producto </Typography>
      <Typography variant='h2' sx={{ mb:'1'}} > Todos los productos Buscado.... </Typography>

      {
        // como nonutilizo la busqueda por params ya no nesesito esto 
        // isLoading ? <FullScreemLoading /> :  <ProductList products={ products }/>
      }

      <ProductList products={ products }/>

    </ShopLayout>
  )
}


export const getServerSideProps:GetServerSideProps = async ({params}) => {

  const { query = '' } = params as { query:string };

  if( query.length === 0 ){
    return {
      redirect :{
        destination:'/',
        permanent: true 
      }
    }
  }
// como estoy del lado del servidor no utilizo mi api sino una funcion de db
  let product = await dbProducts.getProductByTerm(query)

  return{
    props:{
      product
    } 
  }
}



export default SearchHomePage;
