import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  CreditCardOffOutlined,
  CreditCardOutlined,
  GroupOutlined,
  InventoryOutlined,
} from '@mui/icons-material';
import { Button, Grid, Link } from '@mui/material';
import { SummaryTile } from '../../../components/admin';
import { AdminLayout } from '../../../components/layouts';

const OrderDashboardPage = () => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  return (
    <AdminLayout title="Orders Dashboard" subTitle="Generaral Summary Orders">
      <Grid container spacing={4}>
        <SummaryTile
          title="All"
          subTitle=""
          icon={
            <Button onClick={() => navigateTo('/admin/orders/all')}>
              <InventoryOutlined color="primary" sx={{ fontSize: 50 }} />
            </Button>
          }
        />
        <SummaryTile
          title="Users"
          subTitle=""
          icon={
            <Button onClick={() => navigateTo('/admin/orders/users')}>
              <GroupOutlined color="secondary" sx={{ fontSize: 50 }} />
            </Button>
          }
        />
        <SummaryTile
          title="Paid"
          subTitle=""
          icon={<CreditCardOutlined color="success" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title="Un Paid"
          subTitle=""
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 50 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default OrderDashboardPage;
