import { Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { OrderCard } from './OrderCard';
import { IUserOrder } from '../../interfaces';

interface Props {
  orders: IUserOrder[];
}

export const OrderList: FC<PropsWithChildren<Props>> = ({ orders }) => {
  return (
    <Grid container spacing={4}>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </Grid>
  );
};
