import { VerifiedUserOutlined } from '@mui/icons-material';
import { NextPage } from 'next';
import { AdminLayout } from '../../../../components/layouts';
import { OrderList } from '../../../../components/orders';
import { FullScreenLoading } from '../../../../components/ui';
import { useOrders } from '../../../../hooks';

interface Props {}

const OrdersByUser: NextPage<Props> = () => {
  const { orders, isLoading } = useOrders('admin/users/orders');

  return (
    <AdminLayout
      title='Orders'
      subTitle='By User'
      icon={<VerifiedUserOutlined />}
    >
      {isLoading ? <FullScreenLoading /> : <OrderList orders={orders} />}
    </AdminLayout>
  );
};

export default OrdersByUser;
