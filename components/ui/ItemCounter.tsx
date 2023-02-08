import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'


interface itemCounterProps{
  currentValue: number;
  updatedQuantity: (value:number) => void, 
  maxValue: number,
}

export const ItemCounter:FC<itemCounterProps> = ({currentValue, updatedQuantity, maxValue}) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton>
        <RemoveCircleOutline 
          onClick={() => currentValue < maxValue &&  updatedQuantity(1) }
        />
      </IconButton>
        <Typography sx={{width:40, textAlign: 'center'}}>{ currentValue < 0 ? 1 : currentValue }</Typography>
      <IconButton>
        <AddCircleOutline 
        onClick={() => currentValue > 0 && updatedQuantity(-1)}
        />
      </IconButton>
    </Box>
 
  )
}
