import { PropsWithChildren } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../../../components/layouts';

import { getSession } from 'next-auth/react';
import { dbOrders } from '../../../database';
import { ICartProduct } from '../../../interfaces';

interface Props {
  cart: ICartProduct;
}

const GalleryOrderPage: NextPage<PropsWithChildren<Props>> = ({ cart }) => {
  return (
    <ShopLayout
      title={`Gallery ${cart.title} [${cart.size}]`}
      pageDescription="Order summary"
    >
      <Typography variant="h1" component="h1">
        {cart.title} [{cart.size}] [{cart.quantity}]
      </Typography>
      <Grid container spacing={2} marginTop={1}>
        {cart.userImages!.map(({ image, quantity }, index) => (
          <Grid key={image} item xs={12} sm={4} md={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={image}
                  alt={image}
                  className="fadeIn"
                />
              </CardActionArea>
            </Card>
            <Box className="fadeIn">
              <Typography textAlign="center" fontWeight={700} variant="h6">
                Quantity [{quantity}]
              </Typography>
              {cart.title.toLowerCase().includes('event') ? (
                <Typography textAlign="center" fontWeight={700} variant="h6">
                  {'price: $' + cart.userImages![index].information.price}
                </Typography>
              ) : (
                ''
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '', itemId = '', size = '' } = query;

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const cart = await dbOrders.getOrderByProduct(
    id.toString(),
    itemId!.toString(),
    size!.toString()
  );

  return {
    props: {
      cart,
    },
  };
};

export default GalleryOrderPage;
