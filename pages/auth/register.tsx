import { Box, Button, Grid, TextField, Typography, Link, Chip } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layout'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { validation } from '../../utils'
import tesloApi from '../../api/tesloApi';
import { ErrorOutline } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context'
import { getSession, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'


type FormData = {
  name: string,
  email: string,
  password: string
}

const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext(AuthContext) 


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState< string >('');

  const onRegisterPage = async({name, email, password}:FormData) => {

    setShowError(false);

    const {hasError, message} = await registerUser(name, password, email );

    if(hasError) {
      setShowError(true)
      setErrorMessage(message!);
      setTimeout(()=> setShowError(false) ,4000)
    
      return;
    }
    // autenticacion personalizada 
    // const destinations = router.query.p?.toString() || '/'; 
    // router.replace(destinations);

    await signIn('credentials',{email, password});


  }


  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onRegisterPage)}>
      <Box sx={{width:350, padding:'10px 20px'}}>
        <Grid container spacing={2}> 
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'> Crear  Usuario</Typography>
            <Chip 
                label='No se reconoce usuario y/o contraseña'
                color='error'
                icon={<ErrorOutline />}
                className='fedeIn'
                sx={{ display: showError ? 'flex' : 'none'}}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Nombre " variant='filled' fullWidth
              { ...register('name',{
                required: 'Este campo es requerido',
                minLength: {value: 2 , message: 'Minimo 2 caracteres'}
              })
              }
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField type='email' label="correo" variant='filled' 
              fullWidth
              {...register('email',{
                required: 'Este campo es requerido',
                validate: validation.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField label="contraseña" type='password' variant='filled' fullWidth
              {...register('password',
              { 
                required:'Este campo es requerido',
                minLength:{value:6 , message:'Minino seis caracteres'}                          
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
              Autenticar  
            </Button>
          </Grid>


          <Grid item xs={12} display='flex' justifyContent='end'>
            <NextLink 
              href={ router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login' } 
              passHref
            >
              <Link underline="always">
                ¿Ya tienes cuenta?
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
      </form>

    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) =>{

  const session = await getSession({req});

  const {p = '/'} = query; // de esta manera simpre va a ir a lapagina donde visito por ultima vez

  if(session){
    return{
      redirect:{
        destination: p.toString() ,
        permanent: false
      }
    }
  }

  return {
    props:{ }
  }

}

export default RegisterPage