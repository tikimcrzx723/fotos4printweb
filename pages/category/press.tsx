import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';
import { ProductList } from '../../components/products';

const PressPage: NextPage = () => {
  const { products, isLoading } = useProducts('products?type=press');
  return (
    <ShopLayout
      title="Studio-Sueno - Press"
      pageDescription="Find the most important for the presentation of your business."
    >
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default PressPage;
