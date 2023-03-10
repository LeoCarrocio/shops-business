import { Box, Button, Grid, TextField, Typography, Link, Chip, Divider } from '@mui/material'
import React, { useContext } from 'react'
import { AuthLayout } from '../../components/layout'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { validation } from '../../utils'
import { ErrorOutline } from '@mui/icons-material'
import { useState, useEffect } from 'react';
// import { AuthContext } from '../../context'
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next';


type Formdata = {
  email: string,
  password: string,
};


const LoginPage = () => {

  const router = useRouter();

  // const { loginUser } = useContext(AuthContext) 

  const { register, handleSubmit, formState: { errors } } = useForm<Formdata>();
  const [showError, setShowError] = useState<boolean>(false);

  const [providers, setProviders] = useState<any>({});


  useEffect(()=>{
    getProviders().then( prov => { // me trae todos los proooverdores de loguin que tengo como google, githab y demas 
      setProviders(prov);
    })
    
  }, [])

  

  const onLoguinUser = async({email, password} :Formdata) => {
    setShowError(false)

    
    // LOGIN HECHO POR NOSOTROS ----------------------------------------------------------------
    // const isValidLoguin = await loginUser(email, pasword);

    // if(!isValidLoguin){
    //   setShowError(true)
    //   setTimeout(()=> setShowError(false) ,4000)
    //   return;
    // }

    // const destinations = router.query.p?.toString() || '/'

    // router.replace(destinations);
    //--------------------------------------------------

    await signIn('credentials',{email, password});
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
            <NextLink 
              href={ router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register' }
              passHref
            >
              <Link underline="always">
                ¿No tienes cuenta?
              </Link>
            </NextLink>
          </Grid>

          <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
            <Divider sx={{width:'100%', mb:2}} />
            {
              Object.values( providers ).map((provider:any) => {

                if( provider.id === 'credentials') return ( <div key='credentials'></div>)

                return(
                  <Button
                    key={provider.key}
                    variant='outlined'
                    fullWidth
                    color="primary"
                    sx={{ mb:1 }}
                    onClick={()=> signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                )
              })
            }

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


export default LoginPage