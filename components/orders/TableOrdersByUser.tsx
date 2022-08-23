import {
  Box,
  Pagination,
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

export const TableOrderByUser: FC<PropsWithChildren<Props>> = ({
  orders,
}) => {
  const [pageClick, setPageClick] = useState(1);
  let counter = 1;
  const onClick = async (e: any) => {
    counter += 1;
    setPageClick(counter);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapse table">
          <TableHead>
            <TableRow>
              <TableCell />
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
      <Box marginTop={5} display="flex" justifyContent="center">
        <Pagination
          page={pageClick}
          variant="text"
          size="large"
          color="secondary"
          onChange={onClick}
        />
      </Box>
    </>
  );
};
