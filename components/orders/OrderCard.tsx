import { FC, PropsWithChildren, useState } from 'react';
import NextLink from 'next/link';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { IUserOrder } from '../../interfaces';
import { currency } from '../../utils';

interface Props {
  order: IUserOrder;
}

export const OrderCard: FC<PropsWithChildren<Props>> = ({ order }) => {
  const total = currency.format(order.total);
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <NextLink
          href={`/admin/orders/users/${order._id}`}
          passHref
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              <CardMedia
                component='img'
                image={'/avatar.png'}
                alt={order._id!}
                className='fadeIn'
              />
              <Typography gutterBottom variant='h5' component='div'>
                {order.user?.email}
              </Typography>
              <CardContent>
                <Typography variant='h5'>
                  No. Orders = {order.orders}
                </Typography>
                <Typography variant='h5'>No. Items = {order.items}</Typography>
                <Typography variant='h5'>Total = {total}</Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
    </Grid>
  );
};
