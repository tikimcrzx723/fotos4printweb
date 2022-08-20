import { FC, PropsWithChildren } from 'react';
import NextLink from 'next/link';

import { Box, Link, Typography } from '@mui/material';
import { IShippingAddress } from '../../interfaces';
import { useAddress } from '../../hooks';

export const Delivery = () => {
  const { adrress: address } = useAddress('user/address');
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Delivery Address</Typography>
        <NextLink href="/checkout/address" passHref>
          <Link underline="always">Edit</Link>
        </NextLink>
      </Box>

      <Typography>
        {address?.firstName} {address?.lastName}
      </Typography>
      <Typography>
        {address?.address} {address?.address2}
      </Typography>
      <Typography>
        {address?.city}, {address?.zip}
      </Typography>
      <Typography>{address?.state}</Typography>
      <Typography>{address?.phone}</Typography>
    </>
  );
};
