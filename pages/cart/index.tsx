import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext, UIContext } from '../../context';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { useAddress } from '../../hooks';

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const [messageError, setMessageError] = useState('Please Upload Image');
  const { isDelivery, deliveryOrStore } = useContext(UIContext);
  const [isCheckBuy, setIsCheckBuy] = useState(false);
  const router = useRouter();
  const { adrress } = useAddress('user/address');

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  useEffect(() => {
    let counter = 0;
    cart.map((product) => {
      if (product.quantity > 0) {
        if (
          product.title.includes('Event') ||
          product.title.includes('event') ||
          product.title.includes('Tickets') ||
          product.title.includes('tickets')
        ) {
          setMessageError('Please Add Ticket Price');
          if (product.hasOwnProperty('information')) {
            if (product.information.price > 0) {
              counter++;
            }
          }
        } else {
          counter++;
        }
      }
      // if (product.hasOwnProperty('information')) {
      //   if (product.information.price >= 0) {
      //     counter++;
      //   }
      // } else {
      //   if (product.quantity > 0) counter++;
      // }
    });

    if (cart.length === counter) setIsCheckBuy(true);
    else setIsCheckBuy(false);
  }, [cart]);

  // useEffect(() => {
  //   if (adrress === null) router.replace('/perfil/address');
  // }, [adrress, router]);

  const onCreateOrder = async () => {
    if (isDelivery) {
      if (adrress === null || adrress === undefined) {
        router.replace('/perfil/address');
      } else {
        router.push('/checkout/summary');
      }
    } else {
      router.push('/checkout/summary');
    }
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
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h2">Order</Typography>
                {adrress === null ? (
                  <></>
                ) : (
                  <Box>
                    <Switch
                      color="secondary"
                      checked={isDelivery}
                      onChange={deliveryOrStore}
                    />
                    {isDelivery ? 'Send to Home' : 'Pick Up In Store'}
                  </Box>
                )}
              </Box>
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
                    <Typography>Checkout</Typography>
                  </Button>
                ) : (
                  <>
                    <Grid
                      container
                      display="flex"
                      sx={{ alignItems: 'center' }}
                    >
                      <AddPhotoAlternateOutlined />
                      <Typography ml={2}>{messageError}</Typography>
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
