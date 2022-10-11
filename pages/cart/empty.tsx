
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layout';
import { Box, Typography, Link } from "@mui/material";
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
 



const emptyPage = () => {
  
  return (
    <ShopLayout title={'carrito de compras vacio '} pageDescription={'no hay articulos selecionados '} >
      <Box 
        display='flex' 
        justifyContent='center' 
        justifyItems='center'  
        height='50vh' 
        sx={{flexDirection:{ xs: 'column',sm:'row'}, pt:'25%', pl:{xs:'28%'}}}
        >
        <RemoveShoppingCartOutlined sx={{fontSize:100}}/>  
        <Box display='flex' alignItems='center' flexDirection='column'>
          <Typography marginLeft={2}> Su carrito esta vacio</Typography>
          <NextLink href='/' passHref>
            <Link typography='h4' color='secundary'> Regresar </Link>
          </NextLink>
        </Box>
      </Box>

    </ShopLayout >
  )  
}

export default emptyPage