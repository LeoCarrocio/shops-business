import { FC } from 'react'
import { ISize } from '../../interfaces';
import { Box, Button } from '@mui/material';

interface SizeSelectorsProps{
  selectedSize?: ISize;
  sizes:ISize[]
}

export const SizeSelectors:FC<SizeSelectorsProps> = ({selectedSize , sizes}) => {
  return (
    <Box>
      {
        sizes.map( size =>(
          <Button 
            key={ size }
            size="small" 
            color={selectedSize === size ? 'secondary' : 'primary'}
          >
            {size}
          </Button>
        ))
      }

    </Box>

  )
}
