import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { ShopLayout } from '../../components/layout'
import {countries} from './../../utils'

// import { GetServerSideProps } from 'next';
// import { jwt } from '../../utils';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';


type FormData = {
  firstName: string,
  lastName: string,
  address: string,
  address2?: string,
  zip: string,
  city: string,
  country: string,
  phone: string,
}


const AddressPage = () => {

  const router = useRouter();
  const { updateAddres } = useContext(CartContext);
  
  const getAddresFromCookie = ():FormData =>{
    
    return{
      firstName: Cookies.get('firstName') || '',
      lastName: Cookies.get('lastName') || '',
      address: Cookies.get('address') || '',
      address2: Cookies.get('address2') || '',
      zip: Cookies.get('zip') || '',
      city: Cookies.get('city') || '',
      country: Cookies.get('country') || '',
      phone: Cookies.get('phone') || '',
    }
  }


  const { register ,handleSubmit, formState: { errors}, reset} = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      zip: '',
      city: '',
      country: countries[0].code,
      phone: '',
    } 
  });

  useEffect(()=>{

    reset(getAddresFromCookie())
  },[reset])


  

  const onSubmitAddres = (data : FormData) =>{

    updateAddres(data);
    router.push('/checkout/summary')
  }


  return (
    <ShopLayout title='Address' pageDescription='confirmar direccion del destino '>

      <form onSubmit={ handleSubmit(onSubmitAddres) }>

      <Typography variant='h1' component='h1'> Direccion </Typography>

      <Grid container spacing={2} sx={{mt: 2}}>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Nombre" 
            variant='filled' 
            fullWidth
            {
              ...register('firstName',{
                required:'Este campo es requerido'
              })
            }
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Apellido" 
            variant='filled' 
            fullWidth
            {
              ...register('lastName',{
                required:'Este campo es requerido'
              })
            }
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Direccion" 
            variant='filled' 
            fullWidth
            {
              ...register('address',{
                required:'Este campo es requerido'
              })
            }
            error={!!errors.address}
            helperText={errors.address?.message}
            
          
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Direccion 2 (opcional)" 
            variant='filled' 
            fullWidth
            { ...register('address2') }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Codigo Postal" 
            variant='filled' 
            fullWidth

            {
              ...register('zip',{
                required:'Este campo es requerido'
              })
            }
            error={!!errors.zip}
            helperText={errors.zip?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <FormControl fullWidth> */}
            <InputLabel>Pais</InputLabel>
            <TextField
              // select
              variant='filled'
              // defaultValue={ Cookies.get('country') || countries[0].code}
              {
                ...register('country',{
                  required:'Este campo es requerido'
                })
              }
              error={!!errors.country}
              fullWidth
              helperText={errors.country?.message}
            > 
              {/* {
                countries.map(country =>(
                  <MenuItem 
                  value={country.code}
                    key={country.code}
                  >
                    {country.name}
                  </MenuItem>
                ))
              } */}
            </TextField>
          {/* </FormControl> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Ciudad" 
            variant='filled' 
            fullWidth
            {
              ...register('city',{
                required:'Este campo es requerido'
              })
            }
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Telefono" 
            variant='filled' 
            fullWidth
          
            {
              ...register('phone',{
                required:'Este campo es requerido'
              })
            }
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
 
      </Grid>
      <Box sx={{mt:5}} display="flex" justifyContent='center'>
        <Button type='submit' color="secondary" className="circular-btn" size='large'>
          Revisar Pedido
        </Button>
      </Box>

    </form>

    </ShopLayout>
    
  )
}
// capitulo 285 verificacion autenticacion server side
// esta funcion siempre se ejecuta antes de que se devuelva la pagina, osea del lado del sevidos 
// export const getServerSideProps: GetServerSideProps = async ({req}) =>{

//   const {token = '' } = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if(isValidToken){
//     return{
//       redirect:{
//         destination:'/auth/login?p=/checkout/address',
//         permanent: false,
//       }
//     }
//   }



//   return {
//     props:{

//     }
//   }

// }




export default AddressPage