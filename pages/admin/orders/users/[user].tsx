import { NextPage, GetServerSideProps } from 'next';
import { AdminLayout } from '../../../../components/layouts';
import { IOrder } from '../../../../interfaces';
import { dbOrders } from '../../../../database';
import { TableOrderByUser } from '../../../../components/orders';

interface Props {
  orders: IOrder[];
}

const OrderForUser: NextPage<Props> = ({ orders }) => {
  return (
    <AdminLayout title="User" subTitle={orders[0].user?.email || ''}>
      <TableOrderByUser orders={orders} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { user = '' } = query;

  const orders: IOrder[] = await dbOrders.getOrdersByUser(user.toString());

  if (orders.length === 0) {
    return {
      redirect: {
        destination: '/admin/orders/users',
        permanent: false,
      },
    };
  }

  return {
    props: {
      orders,
    },
  };
};

export default OrderForUser;
