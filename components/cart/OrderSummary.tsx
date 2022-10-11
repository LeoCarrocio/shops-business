import {FC} from 'react';
import { Grid, Typography } from '@mui/material';

interface OrderSummaryProps {

}

export const OrderSummary:FC<OrderSummaryProps> = ({}) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. productos </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Sub Total </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>350 usd </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (15%) </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3 usd </Typography>
      </Grid>

      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant='subtitle1'>TOTAL </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
        <Typography variant='subtitle1'>353 usd </Typography>
      </Grid>



    </Grid>
  )
}
 