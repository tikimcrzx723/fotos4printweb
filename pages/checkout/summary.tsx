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
} from '@mui/material';

import { CartContext, UIContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { Delivery, PickUp } from '../../components/address';
import { appApi } from '../../api';

const SummaryPage = () => {
  const router = useRouter();
  const { numberOfItems, createOrder, cart, updateCartProductsByCache } =
    useContext(CartContext);
  const { isDelivery } = useContext(UIContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder(isDelivery);
    await appApi.delete('/orders/cart');

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    updateCartProductsByCache([]);

    router.replace(`/orders/${message}`);
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
                Summary ({numberOfItems}{' '}
                {numberOfItems === 1 ? 'product' : 'products'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              {isDelivery ? <Delivery /> : <PickUp />}

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary cartOrder={cart} />

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
