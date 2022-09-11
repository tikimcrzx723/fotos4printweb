import { PropsWithChildren, useState, useId, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useSnackbar } from 'notistack';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { appApi } from '../../api';
import {
  CreditCard,
  GooglePay,
  PaymentForm,
} from 'react-square-web-payments-sdk';
import { useRole } from '../../hooks';

export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'COMPLETED'
    | 'PAYER_ACTION_REQUIRED';
};

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<PropsWithChildren<Props>> = ({ order }) => {
  const { role } = useRole('user/rol');
  const applyKey = useId();
  const [showCoupon, setShowCoupon] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { shippingAddress } = order;
  const [isPaying, setIsPaying] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState('');

  const onApplyCoupon = async (coupon: string) => {
    const { data } = await appApi.post('/user/coupon', {
      user: order.user,
      cupon: coupon,
      orderId: order._id,
    });
    const message = data.message;
    const variant =
      message === 'Coupon Applied Correctly' ? 'success' : 'error';

    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
    if (message === 'Coupon Applied Correctly') {
      setShowCoupon(false);
      router.reload();
    }
  };

  useEffect(() => {
    if (order.subTotal > order.total || order.isPaid || role === 'client') {
      setShowCoupon(false);
    } else {
      setShowCoupon(true);
    }
  }, []);

  const onOrderCompletedPayPal = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No Paypal payment');
    }

    setIsPaying(true);

    try {
      const { data } = await appApi.post(`/payments/paypal/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert('Error');
    }
  };

  const onOrderCompleted = async () => {
    setIsPaying(true);
    router.reload();
  };

  return (
    <ShopLayout title="Order summary" pageDescription="Order summary">
      <Typography variant="h1" component="h1">
        Order: {order._id}
      </Typography>
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
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary ({order.numberOfItems} product
                {order.numberOfItems > 1 ? 's' : ''})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1">
                {order.delivery?.required === false
                  ? 'Pick Up In Store'
                  : 'Delivery'}
              </Typography>
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
                {shippingAddress.city}, {shippingAddress.zip},{' '}
                {shippingAddress.state}
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                discount={order.subTotal - order.total}
                deliveryPrice={order.delivery?.price}
                complete={order.delivery?.required}
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  total: order.total,
                  tax: order.tax,
                }}
              />
              {showCoupon ? (
                <Box
                  key={applyKey}
                  marginTop={2}
                  display="flex"
                  justifyContent="space-between"
                >
                  <TextField
                    onChange={({ target }) => {
                      setApplyCoupon(target.value);
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ width: '70%' }}
                  />
                  <Button
                    sx={{ width: '25%' }}
                    color="primary"
                    onClick={() => onApplyCoupon(applyCoupon)}
                  >
                    Apply Coupon
                  </Button>
                </Box>
              ) : (
                <></>
              )}
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="center"
                  className="fadeIn"
                  sx={{ display: isPaying ? 'flex' : 'none' }}
                >
                  <CircularProgress />
                </Box>
                <Box
                  flexDirection="column"
                  sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
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
                    <>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.total.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            onOrderCompletedPayPal(details);
                          });
                        }}
                      />
                      <PaymentForm
                        createPaymentRequest={() => ({
                          requestShippingAddress: true,
                          requestBillingInfo: true,
                          currencyCode: 'USD',
                          countryCode: 'US',
                          total: {
                            label: 'FOTO STUDIO EL SUENO',
                            amount: order.total.toString(),
                            pending: false,
                          },
                        })}
                        applicationId={
                          process.env.NEXT_PUBLIC_APPLICATION_ID || ''
                        }
                        locationId={process.env.NEXT_PUBLIC_LOCATION || ''}
                        // createPaymentRequest={}
                        cardTokenizeResponseReceived={async (token, buyer) => {
                          const { data } = await appApi.post(
                            '/payments/square/pay',
                            {
                              sourceId: token.token,
                              amount: order.total,
                              orderId: order._id,
                            }
                          );
                          onOrderCompleted();
                        }}
                      >
                        {/* <ApplePay /> */}
                        <GooglePay />
                        <Box marginBottom={2}></Box>
                        <CreditCard lang="us" />
                      </PaymentForm>
                    </>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
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
