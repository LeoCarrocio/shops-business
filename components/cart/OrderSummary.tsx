import {FC, useContext} from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from "../../context";
import { currency } from '../../utils';


interface OrderSummaryProps {

}

export const OrderSummary:FC<OrderSummaryProps> = ({}) => {

  const { numberOfItems, subTotal, tax, total} = useContext(CartContext);


  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. productos </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{numberOfItems} {numberOfItems > 1 ? 'productos':' producto'}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Sub Total </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos { Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 } %</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ currency.format(tax) }</Typography>
      </Grid>

      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant='subtitle1'>TOTAL </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
        <Typography variant='subtitle1'>{ currency.format(total) }</Typography>
      </Grid>



    </Grid>
  )
}
 