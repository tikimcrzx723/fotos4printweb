import type { NextPage } from 'next';

import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

import { useProducts } from '../hooks/useProducts';
import { FullScreenLoading } from '../components/ui';
import { ProductList } from '../components/products';
import { useRole } from '../hooks';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('products');
  const { role } = useRole('user/rol');

  return (
    <ShopLayout
      title={'Fotos4Print - Home'}
      pageDescription={
        'Print all your memories and photos with the best quality.'
      }
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" component="h1">
          Store
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }} fontSize={20}>
          All Products
        </Typography>
      </Box>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products} role={role.message} />
      )}
    </ShopLayout>
  );
};

export default HomePage;
