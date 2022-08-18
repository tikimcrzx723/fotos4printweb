import { FC, PropsWithChildren } from 'react';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { ICartProduct} from '../../interfaces';

interface Props {
  currentValue: number;
  maxValue: number;
  product: ICartProduct;

  // Methods
  updatedQuantity: (newValue: number, product: ICartProduct) => void;
}

export const ItemCounter: FC<PropsWithChildren<Props>> = ({
  currentValue,
  maxValue,
  product,
  updatedQuantity,
}) => {
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;

      return updatedQuantity(currentValue - 1, product);
    }

    if (currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1, product);
  };
  return (
    <Box marginLeft={3} display="flex" alignItems="center">
      <IconButton onClick={() => addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
