import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useSWR from 'swr';
import { ICuponCode } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 220, headerAlign: 'center' },
  {
    field: 'code',
    headerName: 'Code',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'numCoupons',
    headerName: 'Number of Coupons',
    width: 150,
    align: 'center',
  },
  {
    field: 'minimumPurchase',
    headerName: 'Minimum Purchase',
    width: 150,
    align: 'center',
  },
  { field: 'discount', headerName: 'Discount', align: 'center', width: 75 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<ICuponCode[]>('/api/admin/coupons');

  if (!data && !error) return <></>;

  const rows = data!.map((coupon) => ({
    id: coupon._id,
    code: coupon.code,
    numCoupons: coupon.numCupons,
    minimumPurchase: coupon.minimumPurchase,
    discount: coupon.discount,
  }));

  return (
    <AdminLayout
      title={`Products (${data?.length})`}
      subTitle={'Maintenance Of Products'}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/coupons/new"
        >
          Create new Coupon
        </Button>
      </Box>
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

export default ProductsPage;
