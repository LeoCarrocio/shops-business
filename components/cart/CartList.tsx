
import { initialData } from "../../database/products"
import { Typography, Grid, Link, CardActionArea, CardMedia, Box, Button } from "@mui/material"
import NextLink from 'next/link';
import { ItemCounter } from "../ui";
import {FC} from 'react'



const ProductInCard = [
  initialData.products[0],
  initialData.products[3],
  initialData.products[10]
]

interface CartListProps {
  editable?: boolean
}

export const CartList:FC<CartListProps> = ({editable = false}) => {
  return (
    <>
      {
        ProductInCard.map( product =>( 
          <Grid container spacing={2} sx={{mb:1}} key={product.slug} >
            <Grid item xs={3}> 
              {/* todo: llevar a la pagina del producto */}
              <NextLink href='/product/slug' passHref>
                <Link >
                  <CardActionArea>
                    <CardMedia 
                      image={`/products/${product.images[0]}`}
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
                <Typography variant='body1'> Talla: <strong>M</strong></Typography>

                {
                  editable ?  <ItemCounter /> :  <Typography variant='body1'>3</Typography>
                }

              </Box>
            </Grid>


            <Grid item xs={2} display="flex" alignItems='center' flexDirection='column'> 
              <Typography variant='subtitle1'>$ {product.price}</Typography>
              {
                editable &&  <Button variant='text' color='secondary'>
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
