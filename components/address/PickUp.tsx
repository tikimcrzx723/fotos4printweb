import { FC, PropsWithChildren } from 'react';
import { ICompany } from '../../interfaces';

import { Box, Typography } from '@mui/material';
import { useCompany } from '../../hooks';

interface Props {
  company: ICompany;
}

export const PickUp = () => {
   const { company } = useCompany('user/company');
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Pick Up In Store</Typography>
      </Box>

      <Typography>Fotos4Print</Typography>
      <Typography>
        {company?.address} {company?.address2}
      </Typography>
      <Typography>
        {company?.city}, {company?.zip}
      </Typography>
      <Typography>{company?.state}</Typography>
      <Typography>{company?.phone}</Typography>
    </>
  );
};
