import { Typography, Grid, Link, CardActionArea, CardMedia, Box, Button } from "@mui/material"
import NextLink from 'next/link';
import { ItemCounter } from "../ui";
import {FC, useContext} from 'react';
import { CartContext } from "../../context";
import { ICartProduct } from "../../interfaces";

interface CartListProps {
  editable?: boolean
}

export const CartList:FC<CartListProps> = ({editable = false}) => {


  const { cart, updateCartQuantity, removeCardProduct } = useContext(CartContext);


  const onNewCartQuantityValue = (product: ICartProduct , newQuantityValue: number) =>{
    
    product.quantity = newQuantityValue;

    updateCartQuantity(product);

  }


  return (
    <>
      {
        cart.map( product =>( 
          <Grid container spacing={2} sx={{mb:1}} key={product.slug + product.sizes} >
            <Grid item xs={3}> 
              {/* todo: llevar a la pagina del producto */}
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link >
                  <CardActionArea>
                    <CardMedia 
                      image={`/products/${product.images}`}
                      component='img'
                      sx={{borderRadius:'5px'}}
                    
                    /> 
                  </CardActionArea>
                
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={7}> 
              <Box display="flex" flexDirection="column">
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'> Talla: <strong>{product.sizes}</strong></Typography>

                {
                  editable 
                  ? <ItemCounter 
                      currentValue={product.quantity} 
                      maxValue={10} 
                      updatedQuantity={(value)=>{ onNewCartQuantityValue(product, value)}}                    
                  /> 
                  :  <Typography variant='body1'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                }

              </Box>
            </Grid>

            <Grid item xs={2} display="flex" alignItems='center' flexDirection='column'> 
              <Typography variant='subtitle1'>$ {product.price}</Typography>
              {
                editable && <Button variant='text' color='secondary' onClick={ () => removeCardProduct(product)}>
                  Remover
                </Button>
              }
            </Grid>
          </Grid>
        ))
      } 

    </>

  )
}
