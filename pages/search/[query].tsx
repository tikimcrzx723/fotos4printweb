import type { NextPage, GetServerSideProps } from 'next';

import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={'Studio-Sueno - Search'}
      pageDescription={'Find the best photos'}
    >
      <Typography textAlign='center' variant='h1' component='h1'>
        Find Products
      </Typography>
      {foundProducts ? (
        <Typography
          variant='h2'
          sx={{ mb: 1 }}
          fontSize={20}
          textTransform='capitalize'
        >
          Parameter: {query}
        </Typography>
      ) : (
        <>
          <Typography textAlign='center' variant='h2' sx={{ mb: 1 }}>
            We did not find any product with this description {query}
          </Typography>
        </>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getProductsByTerm('acrylic');
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
