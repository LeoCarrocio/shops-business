import {useContext} from 'react';
import NextLink from 'next/link';
import {UiContext} from '../../context'

import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { SearchOutlined, ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/router';


export const Navbar = () => {

  const {asPath} = useRouter();
  const { toggleSlideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant="h6"> TESLO | </Typography>
            <Typography sx={{ml:0.5}}> Shops </Typography>
          </Link>
          </NextLink>

          <Box flex={1}/>
          <Box  sx={{display:{xs:'none', sm:'block'}}}>
            <NextLink href='/category/men' passHref>
              <Link>
                <Button color={asPath === '/category/men'? 'primary':'info'}> Hombres </Button>
              </Link>
            </NextLink>
            <NextLink href='/category/women' passHref>
              <Link>
                <Button color={asPath === '/category/women'? 'primary':'info'}> Mujeres </Button>
              </Link>
            </NextLink>
            <NextLink href='/category/kids' passHref>
              <Link>
                <Button color={asPath === '/category/women'? 'primary':'info'}> Niños </Button>
              </Link>
            </NextLink>
          </Box>

          <Box flex={1}/>

          <IconButton>
            <SearchOutlined/>
          </IconButton>

          <NextLink href='/cart' passHref>
            <Link>
              <IconButton>
                <Badge badgeContent={2} color='secondary'>
                  <ShoppingCart/>
                </Badge>
              </IconButton>
            </Link>
          </NextLink>
          <Button onClick={toggleSlideMenu}>
            Manu
          </Button>


      </Toolbar>
    </AppBar>


  )
}
