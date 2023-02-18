import {useContext, useState} from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {UiContext, CartContext} from '../../context'

import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCart } from '@mui/icons-material';


export const Navbar = () => {

  const {asPath, push } = useRouter();
  const { toggleSlideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);


  const [search, setSearch] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const onSearch = () =>{
      if(search.trim().length === 0 ) return; 
      push(`/search/${search}`) 
  }

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
          <Box  sx={{display: isSearchVisible ? 'none' : {xs:'none', sm:'block'}}} className='fadeIn'>
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

          {/* pantallas grandes*/ }

          {
            isSearchVisible ? (

              <Input
              className='fadeIn'
              autoFocus
              value={search}
              onChange ={(e)=>setSearch(e.target.value)} 
              onKeyPress ={(e)=>e.key ==='Enter' && onSearch()}
              type='text'
              placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                       onClick={ ()=> setIsSearchVisible(false) }
                      >
                      <ClearOutlined />
                    </IconButton> 
                  </InputAdornment>
                }
                />
                )
                : 
                (
                  
                <IconButton
                  className='fadeIn'
                  onClick={ ()=> setIsSearchVisible(true) }
                  sx={{display:{xs:'none', sm:'flex'}}}
                >
                  <SearchOutlined/>
                </IconButton>

            )
          }



          {/* pantallas pequeñas */ }
          <IconButton 
            sx={{display:{xs:'flex', sm:'none'}}}
            onClick={toggleSlideMenu}
          >
            <SearchOutlined/>
          </IconButton>

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
