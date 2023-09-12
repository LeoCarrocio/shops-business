import { useContext, useState } from 'react';
import {AuthContext, UiContext} from '../../context'


import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined, DashboardOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';


export const SideMenu = () => {


    const {isLoggedIn , user, logout} = useContext(AuthContext);
    const router = useRouter()
    const {isMenuOpen, toggleSlideMenu} = useContext( UiContext)
    const [search, setSearch] = useState<string>('');
    
    const navigateTo = (url: string) => {
        toggleSlideMenu();
        router.push(url) 
    }

    const onSearch = () =>{
        if(search.trim().length === 0 ) return; 
        navigateTo(`/search/${search}`)
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toggleSlideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={search}
                        onChange ={(e)=>setSearch(e.target.value)} 
                        onKeyPress ={(e)=>e.key ==='Enter' && onSearch()}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onSearch}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                    isLoggedIn ?  ( <>

                        <ListItem >
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>

                        <ListItem onClick={()=>navigateTo('/order/history')}>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>

                        <ListItem  onClick={logout}>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem  onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)} >
                                <ListItemIcon>
                                    <VpnKeyOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>
                        </>
                    )

                }

                <ListItem  
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/men')}
                    >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem  
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/women')}
                    >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem  
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/women')}
                    >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>

                {/* Admin */}

            {
                user?.role === 'admin' && (<>
                
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem 
                    onClick={() => navigateTo('/admin/')}
                >
                    <ListItemIcon>
                        <DashboardOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
                <ListItem 
                    onClick={() => navigateTo('/admin/orders')}
                >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ordenes'} />
                </ListItem>
                <ListItem 
                        onClick={ () => navigateTo('/admin/products') }>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                </ListItem>

                <ListItem 
                    onClick={() => navigateTo('/admin/users')}
                >
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={'Usuarios'} />
                </ListItem>
                
                </>)
                } 
            </List>
        </Box>
    </Drawer>
  )
}