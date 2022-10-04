import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../components/layout";



const Custom404 = () => {
  return (
    <ShopLayout title=' Page no found' pageDescription='No hay nada que mostrar'> 
      <Box 
        display='flex' 
        justifyContent='center' 
        justifyItems='center'  
        height='50vh' 
        sx={{flexDirection:{ xs: 'column',sm:'row'}, pt:'25%', pl:{xs:'28%'}}}
        >
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200} > 404 |</Typography>
        <Typography  marginLeft={2}> No se encontro pagina </Typography>
      </Box>
    </ShopLayout> 
  )
} 
 
export default Custom404;