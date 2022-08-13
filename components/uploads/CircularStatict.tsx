import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

interface Props {
  length: number;
  numItem: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; length: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={200} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 50,
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontSize={30}
          color="text.secondary"
        >{`${Math.round(props.value)} of ${props.length}`}</Typography>
      </Box>
    </Box>
  );
}

export const CircularStatict: FC<PropsWithChildren<Props>> = ({
  numItem,
  length,
}) => {
  return <CircularProgressWithLabel value={numItem} length={length} />;
};
