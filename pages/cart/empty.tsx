import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart/CartContext';
import { useCartCache } from '../../hooks';

const EmptyPage = () => {
  const router = useRouter();
  const { cart, updateCartProductsByCache } = useContext(CartContext);

  const { cartCache } = useCartCache('orders/cart');

  useEffect(() => {
    if (cart.length === 0) {
      updateCartProductsByCache(cartCache as any);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) router.push('/cart');
  }, [router, cart]);

  return (
    <ShopLayout title="Empty Cart" pageDescription="No items in shopping cart">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Your Cart Is Empty</Typography>
          <NextLink href="/" passHref>
            <Link typography="h4" color="secondary">
              Return to
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
