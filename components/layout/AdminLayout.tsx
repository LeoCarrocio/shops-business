import {FC} from 'react'
import Head from "next/head";

import { SideMenu } from './../ui'
import {AdminNavbar} from './../admin'
import { Box, Typography } from '@mui/material';

interface AdminLayoutProps{
  title: string;
  subtitle : string;
  icon?: JSX.Element;
  children: React.ReactNode
}

export const AdminLayout:FC<AdminLayoutProps> = ({children,subtitle,title,icon}) => {

  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main style={{
        margin:'80px auto',
        maxWidth:'1440px',
        padding:'0px 30px'
      }}>
        <Box display='flex' flexDirection='column' >
          <Typography variant='h1' component='h1'>
            {icon}
            {title} 
          </Typography>
          <Typography variant='h2' sx={{mb:1}}>{subtitle}</Typography>
        </Box>

        <Box className='fedeIn'>
          {children}
        </Box>
      </main>
    </>
  )
}
