import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/product/ProductList';
import {useProducts} from '../../hooks'
import {FullScreemLoading} from '../../components/ui'
/*
import {IProduct} from '../interfaces'
import { initialData } from '../database/products';
*/

import { Typography, Box} from '@mui/material';
import Product from '../../model/Product';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';


interface PropsSearchHomePage{
  products: IProduct[],
  foundProducts:boolean,
  query:string
}


const SearchHomePage: NextPage<PropsSearchHomePage> = ({products, foundProducts, query}) => {

  // podriamos utilizar esto y funcinaria muy bien ya que saco la busqieda por la direccion pero lo bamos hacer mejor con la kukies, (video 229)
  // const {products, isLoading, isError} = useProducts('/search/camisetas'); 

  return (
    <ShopLayout title={'Home - Search '} pageDescription={'Busqueda de producto '}>
      <Typography variant='h1' component='h1' > Buscar  Productos </Typography>

      {
        !foundProducts  
          ? <Typography variant='h2' sx={{ mb:'1'}} textTransform='capitalize' >Busqueda :  {query}</Typography>
          : <Box display='flex'>  
              <Typography variant='h2' sx={{ mb:'1'}} >No encontramos ningun producto con :</Typography>
              <Typography variant='h2' sx={{ ml:'2'}} >{query}</Typography>
            </Box>
      }


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
  let products = await dbProducts.getProductByTerm(query)
  let foundProducts = products.length === 0;

  if(foundProducts){
    // si la busqueda no me trajo productos 
    console.log('No se encontraron productos ')
    products = await dbProducts.getAllProducts()
  }

  return{
    props:{
      products,
      foundProducts,
      query
    } 
  }
}



export default SearchHomePage;
