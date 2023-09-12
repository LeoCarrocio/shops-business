import {useContext} from 'react';
import NextLink from 'next/link';
import {UiContext, CartContext} from '../../context'

import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';


export const AdminNavbar = () => {

  const { toggleSlideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

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

          <NextLink href='/cart' passHref>
            <Link>
              <IconButton>
                <Badge badgeContent={numberOfItems} color='secondary'>
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
