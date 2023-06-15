import { FC } from 'react'
import { ISize } from '../../interfaces';
import { Box, Button } from '@mui/material';

interface SizeSelectorsProps{
  selectedSize?: ISize;
  sizes:ISize[];

  // Method
  onSelectedSize : (size: ISize) => void;

}

export const SizeSelectors:FC<SizeSelectorsProps> = ({selectedSize , sizes, onSelectedSize}) => {

  return (
    <Box>
      {
        sizes && sizes.map( size =>(
          <Button 
            key={ size }
            size="small" 
            color={selectedSize === size ? 'secondary' : 'primary'}
            onClick={() => onSelectedSize(size)}
          >
            {size}
          </Button>
        ))
      }

    </Box>

  )
}
