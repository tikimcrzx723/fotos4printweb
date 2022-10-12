import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';
import { ProductList } from '../../components/products';

const PhotoPage: NextPage = () => {
  const { products, isLoading } = useProducts('products?type=photo');
  return (
    <ShopLayout
      title='Fotos4print - Photos'
      pageDescription='Print your best photos'
    >
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default PhotoPage;
