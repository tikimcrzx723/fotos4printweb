import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { IOrder } from '../../interfaces';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { currency } from '../../utils';
import {
  CreditCardOffOutlined,
  CreditCardOutlined,
  DownloadForOfflineOutlined,
} from '@mui/icons-material';
import { IUserImage } from '../../interfaces';
import { appApi } from '../../api';

interface Props {
  order: IOrder;
}

export const RowUserTable: FC<PropsWithChildren<Props>> = ({ order }) => {
  const [open, setOpen] = useState(false);
  const onDownloadImage = async (images: IUserImage[]) => {
    images.map(async (image) => {
      const url = image.image;
      // .replaceAll('/', '+');
      console.log(url);

      const arrFile = image.image.toString().split('/');
      const file = arrFile[arrFile.length - 1];

      // const { data } = await appApi.get('/orders/user/' + url);
      appApi({
        url: '/admin/orders/download',
        data: { url },
        // url: '/orders/user/' + url,
        method: 'POST',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    });
  };

  return (
    <>
      <TableRow key={order._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order._id}
        </TableCell>
        <TableCell align="right">{order.orderState}</TableCell>
        <TableCell align="right">{order.numberOfItems}</TableCell>
        <TableCell align="right">{currency.format(order.total)}</TableCell>
        <TableCell align="right">
          {order.isPaid ? (
            <CreditCardOutlined color="success" sx={{ fontSize: 35 }} />
          ) : (
            <CreditCardOffOutlined color="error" sx={{ fontSize: 35 }} />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>title</TableCell>
                    <TableCell>image</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>QTY</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item._id + item.size}>
                      <TableCell>
                        <Typography>
                          {item.title} [{item.size}]
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                        />
                      </TableCell>
                      <TableCell>{currency.format(item.price)}</TableCell>
                      <TableCell>
                        {item.quantity} {item.needImages}
                      </TableCell>
                      <TableCell>
                        {currency.format(item.quantity * item.price)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ display: item.needImages ? '' : 'none' }}
                          color="secondary"
                          onClick={() => onDownloadImage(item.userImages!)}
                        >
                          <>
                            <DownloadForOfflineOutlined sx={{ fontSize: 40 }} />
                          </>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
