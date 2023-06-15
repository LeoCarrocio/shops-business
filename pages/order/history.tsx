import React from 'react';
import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { ShopLayout } from '../../components/layout';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, Typography, Chip ,Link } from '@mui/material';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


const column:GridColDef[]=[
  { field:'id' , headerName: 'ID', width:100},
  { field:'FullName' , headerName: 'Nombre completo', width:300},
  { field:'paid', headerName: 'Pagada',
    description:'Muestra informacion si abono o no la orden ',
    width:200,
    renderCell:(params:GridRenderCellParams)=>{
      return(
        params.row.paid
          ? <Chip color='success' label='Pagada' variant='outlined'/>
          : <Chip color='error' label='No pagada' variant='outlined'/>
      )
    },
  },
  { field:'Orden', headerName: 'Ver orden',
    description:'Ir a la orden  ',
    sortable: false,
    width:200,
    renderCell:(params:GridRenderCellParams)=>{
      return(
        <NextLink href={`/order/${params.row.orderId}`} passHref>
          <Link underline='always'> Ver orden  </Link>
        </NextLink>
      )
    },
  }
  
]

interface Props {
  orders: IOrder[]
}


const historyPage:NextPage<Props> = ({orders}) => {


  const rows = orders.map((order, idx)=>({
    id : idx + 1,
    paid: order.isPaid,
    fullName: `${order.shippingAddres.firstName} ${order.shippingAddres.lastName}`,
    orderId: order._id
  }))


  return (
    <ShopLayout title='Historial del ordenes' pageDescription='Historial del ordenes del cliente'>
      <Typography variant='h1' component='h1'>Lista de ordenes </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height:650, width:'100%'}}>
          <DataGrid
            rows={rows}
            columns={column}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


// DATOS CREADOS DESDE EL SERVIDOR, y no desde el navegador 
export const getServerSideProps : GetServerSideProps = async ({req}) =>{

  const session :any = await getSession({req})

  if(!session){
    return{
      redirect:{
        destination:'/auth/login?p=/orders/history',
        permanent:false
      }
    }
  }

  const orders = await dbOrders.getOrderByUser(session.user._id);

  return{
    props:{
      orders
    }
  }
}


export default historyPage