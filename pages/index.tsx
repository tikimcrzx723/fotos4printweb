import { useContext, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';

import {
  Card,
  CardActionArea,
  Grid,
  Link,
  CardMedia,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { GridCloseIcon } from '@mui/x-data-grid';
import { AuthContext, UIContext } from '../context';
import { useCartCache } from '../hooks';
import { CartContext } from '../context/cart/CartContext';
// @ts-ignore 
import ReactGA from 'react-ga4'

const HomePage: NextPage = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ADSENSE!)
  const { freeDelivery, closeDelivery } = useContext(UIContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const { cart, updateCartProductsByCache } = useContext(CartContext);
  const { cartCache } = useCartCache('orders/cart');

  const cartRender = useMemo(() => {
    return cart.length === 0 ? cartCache : cart;
  }, [cart, cartCache]);

  useEffect(() => {
    updateCartProductsByCache(cartRender as any);
  }, []);

  return (
    <>
      {freeDelivery && isLoggedIn ? (
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ background: 'yellow', marginTop: 7.5 }}
        >
          <Typography color="primary"></Typography>
          <Typography color="primary" variant="h6" sx={{ fontWeight: 700 }}>
            Add $100.00 to your order to receive FREE SHIPPING! (Only OR, WA)
          </Typography>
          <IconButton
            onClick={closeDelivery}
            aria-label="close"
            color="primary"
            size="small"
          >
            <GridCloseIcon fontSize="medium" sx={{ fontWeight: 700 }} />
          </IconButton>
        </Box>
      ) : (
        <></>
      )}
      <ShopLayout
        title={'Fotos4Print - Home'}
        pageDescription={
          'Print all your memories and photos with the best quality.'
        }
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Card>
              <NextLink href={'/category/photo'} passHref prefetch={false}>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={'/a.jpg'}
                      alt="anime"
                      className="fadeIn"
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <NextLink href={'/category/gift'} passHref prefetch={false}>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/b.jpg"
                      alt="anime"
                      className="fadeIn"
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <NextLink href={'/category/press'} passHref prefetch={false}>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/c.jpg"
                      alt="anime"
                      className="fadeIn"
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Card>
          </Grid>
        </Grid>
      </ShopLayout>
    </>
  );
};

export default HomePage;
