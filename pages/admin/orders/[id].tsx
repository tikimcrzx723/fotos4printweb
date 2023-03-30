import { GetServerSideProps, NextPage } from 'next';

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from '@mui/material';
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

import { CartList, OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';
import { IOrder, IUserImage } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import { appApi } from '../../../api';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress, orderItems } = order;

  const onDownloadImage = async (images: IUserImage[], name: string) => {
    images.map(async ({ image, quantity }) => {
      onDownloadClick(image, quantity);
    });
  };

  const onDownloadCardAndPost = async (
    information: [{ type: string; front: string; back: string }]
  ) => {
    information.map(async ({ type, front, back }, index) => {
      if (type === '4/4') {
        onDownloadClick(back, index);
      }
      onDownloadClick(front, index);
    });
  };

  const onDownloadClick = async (url: string, index: number) => {
    const backtArr = url.split('/');

    const extension =
      backtArr[backtArr.length - 1].split('.')[
        backtArr[backtArr.length - 1].split('.').length - 1
      ];

    const download = backtArr[backtArr.length - 1].split('.')[0];

    const file = `${download}[${index}].${extension}`;

    const { data } = await appApi({
      url: '/admin/orders/download',
      data: { url },
      method: 'POST',
      responseType: 'blob',
    });
    const urlImage = await window.URL.createObjectURL(new Blob([data]));
    const link = await document.createElement('a');
    link.href = urlImage;
    await link.setAttribute('download', file);
    await document.body.appendChild(link);
    await link.click();
  };

  return (
    <AdminLayout
      title="Order Summary"
      subTitle={`OrderId: ${order._id}`}
      icon={<AirplaneTicketOutlined />}
    >
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Order has been paid"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pending payment"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList
            products={order.orderItems}
            admin={true}
            editable={false}
            onDownloadImage={onDownloadImage}
            onDownloadCardAndPost={onDownloadCardAndPost}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary ({order.numberOfItems}{' '}
                {order.numberOfItems > 1 ? 'products' : 'product'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box>
                <Typography variant="subtitle1">Delivery Address</Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{' '}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ''}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.state}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                cartOrder={orderItems as any}
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  total: order.total,
                  tax: order.tax,
                }}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {/* TODO */}

                <Box display="flex" flexDirection="column">
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label="Order has been paid"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label="Pending payment"
                      variant="outlined"
                      color="error"
                      icon={<CreditCardOffOutlined />}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;
  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
