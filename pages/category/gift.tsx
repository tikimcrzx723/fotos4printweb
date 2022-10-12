import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';
import { ProductList } from '../../components/products';

const GiftPage: NextPage = () => {
  const { products, isLoading } = useProducts('products?type=gift');
  return (
    <ShopLayout
      title='Studio-Sueno - Gifts'
      pageDescription='Find the best gifts for those special people'
    >
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default GiftPage;
