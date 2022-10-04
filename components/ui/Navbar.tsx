import NextLink from 'next/link';

import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { SearchOutlined, ShoppingCart } from '@mui/icons-material';



export const Navbar = () => {
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
                <Button> Hombres </Button>
              </Link>
            </NextLink>
            <NextLink href='/category/women' passHref>
              <Link>
                <Button> Mujeres </Button>
              </Link>
            </NextLink>
            <NextLink href='/category/kids' passHref>
              <Link>
                <Button> Niños </Button>
              </Link>
            </NextLink>
          </Box>

          <Box flex={1}/>

          <IconButton>
            <SearchOutlined/>
          </IconButton>

          <NextLink href='/card' passHref>
            <Link>
              <IconButton>
                <Badge badgeContent={2} color='secondary'>
                  <ShoppingCart/>
                </Badge>
              </IconButton>
            </Link>
          </NextLink>
          <NextLink href='/' passHref>
            <Link>
              <Typography sx={{ml:0.5}}> MENU </Typography>
            </Link>
          </NextLink>


      </Toolbar>
    </AppBar>


  )
}
