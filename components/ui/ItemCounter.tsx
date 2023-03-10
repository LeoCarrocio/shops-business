import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'


interface itemCounterProps{
  currentValue: number;
  maxValue: number,

  // methods
  updatedQuantity: (value:number) => void, 
}

export const ItemCounter:FC<itemCounterProps> = ({currentValue, updatedQuantity, maxValue}) => {

  const addOrRemove = (value:number) => {

    if(value === -1){
      if( currentValue === 1) return;

      return updatedQuantity(currentValue -1)
    }

    if(currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1)

  }

  return (
    <Box display='flex' alignItems='center'>
      <IconButton>
        <RemoveCircleOutline 
          onClick={() => addOrRemove(-1)}
        />
      </IconButton>
        <Typography sx={{width:40, textAlign: 'center'}}>{ currentValue }</Typography>
      <IconButton>
        <AddCircleOutline 
        onClick={() => addOrRemove(+1)}
        />
      </IconButton>
    </Box>
 
  )
}
