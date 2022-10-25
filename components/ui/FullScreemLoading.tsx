import { Box, Typography, CircularProgress } from "@mui/material";

export const FullScreemLoading = () => {
  return (
      <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        justifyItems='center'  
        height='50vh' 
        sx={{flexDirection:{ xs: 'column',sm:'row'}, pt:'25%', pl:{xs:'28%'}}}
        >
        <Typography> Cargando... </Typography>
        <CircularProgress thickness={2}/>
      </Box>
  )
}
 