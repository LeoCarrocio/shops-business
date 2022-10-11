
import { initialData } from "../../database/products"
import { Typography, Grid, Link, CardActionArea, CardMedia, Box, Button } from "@mui/material"
import NextLink from 'next/link';
import { ItemCounter } from "../ui";



const ProductInCard = [
  initialData.products[0],
  initialData.products[3],
  initialData.products[10]
]

export const CartList = () => {
  return (
    <>
      {
        ProductInCard.map( product =>( 
          <Grid container spacing={2} sx={{mb:1}} key={product.slug} >
            <Grid item xs={3}> 
              {/* todo: llevar a la pagina del producto */}
              <NextLink href='/product/slog' passHref>
                <Link >
                  <CardActionArea>
                    <CardMedia 
                      image={`products/${product.images[0]}`}
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

                { /* considcional  si es editable  */}

                <ItemCounter />
              </Box>
            </Grid>


            <Grid item xs={2} display="flex" alignItems='center' flexDirection='column'> 
              <Typography variant='subtitle1'>$ {product.price}</Typography>
              { /* considcional  si es editable  */}

              <Button variant='text' color='secondary'>
                Remover
              </Button>

            </Grid>

          </Grid>
 


        ))
      } 

    </>

  )
}
