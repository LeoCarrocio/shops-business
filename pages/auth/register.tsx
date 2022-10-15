import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material'
import React from 'react'
import { AuthLayout } from '../../components/layout'
import NextLink from 'next/link'


const RegisterPage = () => {
  return (
    <AuthLayout title='Login'>
      <Box sx={{width:350, padding:'10px 20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'> Crear  Usuario</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Nombre" variant='filled' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Apellido " variant='filled' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="correo" variant='filled' fullWidth/>
          </Grid>

          <Grid item xs={12}>
            <TextField label="contraseña" type='password' variant='filled' fullWidth/>
          </Grid>

          <Grid item xs={12}>
            <TextField label="repita contraseña" type='password' variant='filled' fullWidth/>
          </Grid>

          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              Autenticar  
            </Button>
          </Grid>


          <Grid item xs={12} display='flex' justifyContent='end'>
            <NextLink href='/auth/login' passHref>
              <Link underline="always">
                ¿Ya tienes cuenta?
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage