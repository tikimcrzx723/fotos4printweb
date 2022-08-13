import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AdminLayout } from '../../../components/layouts';
import useSWR from 'swr';
import { IOrder, IUser } from '../../../interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 210 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'name', headerName: 'Fullname', width: 230 },
  { field: 'total', headerName: 'Total Amount', width: 150 },
  {
    field: 'isPaid',
    headerName: 'Paid',
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Paid' color='success' />
      ) : (
        <Chip variant='outlined' label='Not Paid' color='error' />
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
        <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
          View Order
        </a>
      );
    },
  },
  { field: 'createdAt', headerName: 'Created At', width: 300 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
    status: order.orderState,
  }));

  return (
    <AdminLayout
      title={'Orders'}
      subTitle={'Maintenance of orders'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className='fadeIn'>
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

export default OrdersPage;
