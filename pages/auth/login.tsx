import { Box, Button, Grid, TextField, Typography, Link, Chip } from '@mui/material'
import React, { useContext } from 'react'
import { AuthLayout } from '../../components/layout'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { validation } from '../../utils'
import { tesloApi } from '../../api'
import { ErrorOutline } from '@mui/icons-material'
import { useState } from 'react';
import { AuthContext } from '../../context'
import { useRouter } from 'next/router';


type Formdata = {
  email: string,
  pasword: string,
};


const LoginPage = () => {

  const router = useRouter();

  const { loginUser } = useContext(AuthContext) 

  const { register, handleSubmit, formState: { errors } } = useForm<Formdata>();
  const [showError, setShowError] = useState<boolean>(false);

  const onLoguinUser = async({email, pasword} :Formdata) => {
    setShowError(false)

    const isValidLoguin = await loginUser(email, pasword);

    if(!isValidLoguin){
      setShowError(true)
      setTimeout(()=> setShowError(false) ,4000)
      return;
    }

    router.replace('/');

  }


  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onLoguinUser)}> 
      <Box sx={{width:350, padding:'10px 20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'> Iniciar Seccion</Typography>
            
              <Chip 
                label='No se reconoce usuario y/o contraseña'
                color='error'
                icon={<ErrorOutline />}
                className='fedeIn'
                sx={{ display: showError ? 'flex' : 'none'}}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField type='email' label="correo" variant='filled' fullWidth 
              {...register('email',
              {
                required: 'Este campo es requerido',
                validate: validation.isEmail,
              })}
              error={!!errors.email} 
              helperText={errors.email?.message}
            /> 
          </Grid>

          <Grid item xs={12}>
            <TextField type='password'  label="contraseña" variant='filled' fullWidth 
              {...register('pasword',
                { 
                  required:'Este campo es requerido',
                  minLength:{value:6 , message:'Minino seis caracteres'}                          
                })}
                error={!!errors.pasword} 
                helperText={errors.pasword?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              type='submit'
              color='secondary' 
              className='circular-btn' 
              size='large' 
              fullWidth
            >
              Ingresar 
            </Button>
          </Grid>


          <Grid item xs={12} display='flex' justifyContent='end'>
            <NextLink href='/auth/register' passHref>
              <Link underline="always">
                ¿No tienes cuenta?
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage