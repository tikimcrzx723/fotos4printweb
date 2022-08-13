import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const [isCheckBuy, setIsCheckBuy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  useEffect(() => {
    let counter = 0;
    cart.map((product) => {
      if (product.quantity > 0) counter++;
    });

    if (cart.length === counter) setIsCheckBuy(true);
    else setIsCheckBuy(false);
    console.log(counter);
    console.log(cart.length);
  }, [cart]);

  const onCreateOrder = async () => {
    router.push('/checkout/summary');
  };

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout title={`Cart`} pageDescription="Shopping cart">
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={true} />
        </Grid>
        <Grid item xs={12} sm={5} marginBottom={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                {isCheckBuy ? (
                  <Button
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                    onClick={onCreateOrder}
                    // href='/checkout/address'
                  >
                    Checkout
                  </Button>
                ) : (
                  <>
                    <Grid
                      container
                      display="flex"
                      sx={{ alignItems: 'center' }}
                    >
                      <AddPhotoAlternateOutlined />
                      <Typography ml={2}>Please Upload Images</Typography>
                    </Grid>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
