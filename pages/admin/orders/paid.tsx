import { useState, useEffect } from 'react';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AdminLayout } from '../../../components/layouts';
import useSWR from 'swr';
import { IOrder } from '../../../interfaces';
import moment from 'moment';
import { appApi } from '../../../api';
import { IAddress } from '../../../interfaces';

const PaidOrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>(
    '/api/admin/orders?isPaid=true&orderState=processing'
  );
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (data) setOrders(data);
  }, [data]);

  if (!data && !error) return <></>;

  const onStatusUpdated = async (
    orderId: string,
    status: string,
    email: string
  ) => {
    if (status === 'completed') {
      const order = data?.find((ord) => ord._id === orderId);
      const address = await appApi.get(`/admin/users/address/${order?.user}`);
      if (address !== null) {
        const body = {
          phone: address.data.phone,
          msn: order?.delivery?.required
            ? `Your order has Your Has Shipped - Order #${orderId}`
            : `Your order is ready for pick up #${orderId}`,
        };
        await appApi.post('/admin/users/sendOrderMSN', body);
      }
    }
    const previosOrders = orders.map((order) => ({ ...order }));
    const updatedOrders = orders.map((order) => ({
      ...order,
      orderState: orderId === order._id ? status : order.orderState,
    }));

    setOrders(updatedOrders as any);

    try {
      await appApi.put('/admin/orders', { orderId, status });
    } catch (error) {
      setOrders(previosOrders);
      alert('I cannot change the status');
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 210 },
    { field: 'email', headerName: 'Email', width: 190 },
    { field: 'total', headerName: 'Total Amount', width: 100 },
    {
      field: 'isPaid',
      headerName: 'Paid',
      renderCell: ({ row }: GridValueGetterParams) => {
        return row.isPaid ? (
          <Chip variant="outlined" label="Paid" color="success" />
        ) : (
          <Chip variant="outlined" label="Not Paid" color="error" />
        );
      },
    },
    {
      field: 'noProducts',
      headerName: 'No.Products',
      align: 'center',
      width: 100,
    },
    {
      field: 'check',
      headerName: 'View Order',
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
            View Order
          </a>
        );
      },
    },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.status}
            label="Status"
            onChange={({ target }) =>
              onStatusUpdated(row.id, target.value, row.email)
            }
            sx={{ width: '300px' }}
          >
            <MenuItem key={'pending'} value="pending">
              Pending
            </MenuItem>
            <MenuItem key={'processing'} value="processing">
              Processing
            </MenuItem>
            <MenuItem key={'completed'} value="completed">
              Completed
            </MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    email: order.user?.email,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: moment(order.createdAt).format('MMMM Do YYYY, h:mm a'),
    status: order.orderState,
  }));

  return (
    <AdminLayout
      title={'Orders'}
      subTitle={'Paid Orders'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default PaidOrdersPage;
