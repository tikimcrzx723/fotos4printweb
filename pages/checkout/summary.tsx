import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  Link,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  Switch,
} from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { useAddress } from '../../hooks';

const SummaryPage = () => {
  const router = useRouter();
  const { numberOfItems, createOrder } = useContext(CartContext);
  const [checked, setChecked] = useState(false);

  const { adrress } = useAddress('user/address');

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder(false);

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  const addDelivery = () => {
    setChecked(!checked);
  };

  return (
    <ShopLayout title="Order Summary" pageDescription={'Order Summary'}>
      <Typography variant="h1" component="h1">
        Order Summary
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
               Summary ({numberOfItems} {numberOfItems === 1 ? 'product' : 'products'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  {checked ? 'Delivery' : 'Store'} Address
                </Typography>
                {checked ? (
                  <NextLink href="/checkout/address" passHref>
                    <Link underline="always">Edit</Link>
                  </NextLink>
                ) : (
                  <></>
                )}
              </Box>

              <Typography>
                {adrress?.firstName} {adrress?.lastName}
              </Typography>
              <Typography>
                {adrress?.address}
                {adrress?.address2 ? `, ${adrress?.address2}` : ''}{' '}
              </Typography>
              <Typography>
                {adrress?.city}, {adrress?.zip}
              </Typography>
              {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}
              <Typography>{adrress?.country}</Typography>
              <Typography>{adrress?.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary delivery />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirm Order
                </Button>

                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
