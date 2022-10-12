import { FC, PropsWithChildren } from 'react';

import { Box, Button } from '@mui/material';
import Image from 'next/image';

interface Props {
  selectedSize?: string;
  sizes: string[];

  // Methods
  onSelectedSize: (size: string) => void;
}

export const SizeSelector: FC<PropsWithChildren<Props>> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <Box marginTop={1}>
      {sizes.map((size) => (
        <Button
          sx={{ fontSize: 16 }}
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSelectedSize(size)}
        >
          {size.includes('http') ? (
            <Image src={size} alt="product image" width={100} height={100} />
          ) : (
            size
          )}
        </Button>
      ))}
    </Box>
  );
};
