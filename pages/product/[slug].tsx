import { FC, useState, useContext } from 'react';
import { NextPage,GetServerSideProps,GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from "../../components/layout"
import {ItemCounter} from '../../components/ui'
import { ICartProduct, IProduct, ISize } from '../../interfaces'

import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { ProductSlideShow } from '../../components/product/ProductSlideShow';
import { SizeSelectors } from '../../components/product';
import { useRouter } from 'next/router';
import { useProducts } from '../../hooks';
import { dbProducts } from '../../database';
import { CartContext } from '../../context';


//const product = initialData.products[0]

interface ProductPageProps{
  product: IProduct
}
 
const ProductPage:NextPage<ProductPageProps> = ({product}) => {

  // Esta es una forma de hacerlo q no seria la mas optima, ya q llmaria muchas veses x cada producto al back
  // y no estariamos aprovechando las vondades de next, y el promebla q google crom no lee esto y no tenemos el seo para los motores de google  (VIDEO 225)
  // const router = useRouter();
  // const { product: IProduct, isLoading, isError } = useProducts(`/products/${router.query.slug}`)
  // si loading en treu, me mostriaria cargando .... osea espera para cargar y POR ESOS AL PRINCIPIO TRAERIA MUCHOS ERRORE  
  // if(isLoading){
  //   return <h1> CARGANDO ... </h1>
  // }

  const router = useRouter();
  const {addProductTocart} = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    sizes: undefined,
    slug: product.slug,
    title: product.title,
    gender:product.gender,
    quantity: 1
  })

  const selectedSize = (size: ISize)=>{

    setTempCartProduct(currentProduct =>({
      ...currentProduct,
      sizes: size,
    }))
  }

  const updateQuantity = (quantity:number) =>{
    
    setTempCartProduct(currentProduct =>({
      ...currentProduct,
      quantity
    }))
  }

  

  const onAddProduct = () =>{

    if(!tempCartProduct.sizes) { return; }

    // llama a accion del context para agregar al carrito 

    addProductTocart(tempCartProduct);

    router.push('/cart');
  }


  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3} >

        <Grid item xs={12} sm={7} >
          
          <ProductSlideShow
            images={product.images}
          />

        </Grid>
        
        <Grid item xs={12} sm={5} >
          <Box display='flex' flexDirection='column' >
            {/* title */}
            <Typography variant='h1' component='h1'> {product.title} </Typography> 
            <Typography variant='subtitle1' component='h2'>$ {product.price} </Typography>  
            
            {/* Cantidad */}
            <Box sx={{my:2}}>

              <Typography variant='subtitle2'>Cantidad</Typography>
              
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={updateQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />
              
              <SizeSelectors 
                selectedSize={tempCartProduct.sizes}
                sizes={product.sizes} 
                onSelectedSize={ selectedSize } 
              />
            
            </Box>

            {/*  agregar carrito */}
            {
              product.inStock > 0 ? 
                <Button 
                  color='secondary' 
                  className='circular-btn'
                  onClick={onAddProduct}  
                >
                  {
                    tempCartProduct.sizes 
                    ? 'Agregar al carrito' : 'Seleccione una talla' 
                  } 
                </Button> 
                :
                <Chip label='No hay Productos' color='error' variant='outlined'/>

            }

            {/* Description  */}
            <Box sx={{mt:3}}>
              <Typography variant='subtitle2'> Description </Typography> 
              <Typography variant='body2'> {product.description} </Typography>  
            </Box>
 
          </Box>
        </Grid>


      </Grid>
    </ShopLayout>

  )
}

//esta vercion la hacemos con  getServerSideProps, que lo llama del lado del servidor y no del lado del cliente
//import { GetServerSideProps } from 'next'; (VIDEO 227)


/* tampoco la vamos a usar porque me busca todos los datos de la de pagina y no queremos eso, sino q se genera la pagina en cada build , y q solo se actualice x dia o semana o cuanod se lo solicite 
export const getServerSideProps : GetServerSideProps = async({params}) =>{

  const {slug} = params as {slug:string};
  const product = await dbProducts.getProductsBySlug(slug);

  if(!product){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  return{ 
    props:{
      product
    }
  }
}
*/


// la solucion es generarlo de manera estatica (VIDEO 228)


export const getStaticPaths: GetStaticPaths = async (ctx) =>{
  
  const productSlugs = await dbProducts.getAllProductSlugs();

  return{
    paths: productSlugs.map(({slug})=>({
      params:{
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps : GetStaticProps = async ({params}) =>{

  const {slug = '' } = params as {slug: string }  

  const product = await dbProducts.getProductsBySlug(slug);

  if(!product){
    return{
      redirect:{
        destination:'/', 
        permanent:false
      }
    }
  }

  return {
    props:{
      product
    },
    revalidate: 60 * 60 * 24
  }
}



export default ProductPage