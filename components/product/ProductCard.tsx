import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardActionArea, CardMedia,Box,Link, Chip } from '@mui/material';

import{ IProduct } from './../../interfaces';

interface ProductCardProps{
  product: IProduct
}

export const ProductCard:FC<ProductCardProps> = ({product}) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isImageLoading, setImageLoading] = useState<boolean>(false)

  const ProductImage = useMemo(() =>{
    return isHovered ? `/products/${product.images[0]}`: `/products/${product.images[1]}`
  },[isHovered, product.images])

  return (
    <Grid item xs={6} sm={4} 
      onMouseEnter={()=> setIsHovered(true)}
      onMouseLeave={()=> setIsHovered(false)}
    >
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
        <Link>
        <CardActionArea>
          
          {
            product.inStock === 0 && 
              <Chip
                color='primary'
                label='No hay productos'
                sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px'}}
              />
          }
          
          <CardMedia 
            className="fadeIn"
            component='img'
            image={ProductImage}
            alt={product.title}
            onLoad ={ () => setImageLoading(true)}
            >
          </CardMedia>
        </CardActionArea>
        </Link> 
      </NextLink>
    </Card>
      <Box sx={{mt:1, display:isImageLoading ? 'block':'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title} </Typography>
        <Typography fontWeight={400}>$ {product.price} </Typography>
      </Box>
    </Grid>
  ) 
}
