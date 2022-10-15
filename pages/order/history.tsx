import React from 'react';
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layout';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, Typography, Chip ,Link } from '@mui/material';


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
        <NextLink href={`/order/${params.row.id}`} passHref>
          <Link underline='always'> Ver orden  </Link>
        </NextLink>
      )
    },
  }
  
]

const row=[
{ id:1,paid:true ,FullName:'Leonardo carrocio'},
{ id:2,paid:true ,FullName:'Leonardo carrocio'},
{ id:3,paid:false ,FullName:'Flavia lopez'},
{ id:4,paid:true ,FullName:'Leonardo carrocio'},
]


const historyPage = () => {
  return (
    <ShopLayout title='Historial del ordenes' pageDescription='Historial del ordenes del cliente'>
      <Typography variant='h1' component='h1'>Lista de ordenes </Typography>

      <Grid container >
        <Grid item xs={12} sx={{ height:650, width:'100%'}}>
          <DataGrid
            rows={row}
            columns={column}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default historyPage