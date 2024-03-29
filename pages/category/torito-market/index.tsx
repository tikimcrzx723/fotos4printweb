import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../../../components/layouts';
import { FullScreenLoading } from '../../../components/ui';
import { useProducts } from '../../../hooks';
import { ProductList } from '../../../components/products';

const ToritoPage: NextPage = () => {
  const { products, isLoading } = useProducts('products?type=torito-market');
  return (
    <ShopLayout
      title='Studio-Sueno - Gifts'
      pageDescription='Find the best gifts for those special people'
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h1' component='h1'>
          Gifts
        </Typography>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default ToritoPage;
