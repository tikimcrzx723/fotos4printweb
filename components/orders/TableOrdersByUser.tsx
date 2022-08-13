import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { IOrder } from '../../interfaces';
import { RowUserTable } from '.';

interface Props {
  orders: IOrder[];
}

export const TableOrderByUser: FC<PropsWithChildren<Props>> = ({ orders }) => {
  const onClick = async () => {
    console.log('hola');
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapse table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>OrderId</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">No. Items</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Is Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <RowUserTable key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
