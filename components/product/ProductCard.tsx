import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardActionArea, CardMedia,Box,Link } from '@mui/material';

import{ IProduct } from './../../interfaces';

interface ProductCardProps{
  product: IProduct
}

export const ProductCard:FC<ProductCardProps> = ({product}) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const ProductImage = useMemo(() =>{
    return isHovered ? `products/${product.images[0]}`: `products/${product.images[1]}`
  },[isHovered, product.images])



  return (
    <Grid item xs={6} sm={4} 
      onMouseEnter={()=> setIsHovered(true)}
      onMouseLeave={()=> setIsHovered(false)}
    >
    <Card>
      <NextLink href='/product/slug' passHref prefetch={false}>
        <Link>
        <CardActionArea>
          <CardMedia 
            className="fadeIn"
            component='img'
            image={ProductImage}
            alt={product.title}
            >
          </CardMedia>
        </CardActionArea>
        </Link>
      </NextLink>
    </Card>
      <Box sx={{mt:1}} className='fadeIn'>
        <Typography fontWeight={700}>{product.title} </Typography>
        <Typography fontWeight={400}>$ {product.price} </Typography>
      </Box>
    </Grid>
  ) 
}
