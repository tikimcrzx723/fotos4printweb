import { FC, PropsWithChildren, useContext } from 'react';

import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

interface IProp {
  counterCharger: number;
  quantityImages: number;
}

export const Loader: FC<PropsWithChildren<IProp>> = ({
  counterCharger,
  quantityImages,
}) => {
  const progress = Math.round(counterCharger * (100 / quantityImages));

  return (
    <>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}></Box>
      <CircularProgress color='secondary' variant="determinate" size={250} value={progress} />
      <Box
        sx={{
          top: 12,
          left: 0,
          bottom: 0,
          right: 9,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontSize={40}
          color="text.secondary"
        >
          {counterCharger} of {quantityImages}
        </Typography>
      </Box>
      <Box />
    </>
  );
};
