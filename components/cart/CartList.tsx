import { FC, PropsWithChildren, useContext, useState } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CartContext } from '../../context/cart';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { UploadImageByCart } from '../uploads/UploadImageByCart';
import { useRole } from '../../hooks';
import { ItemCounter } from '../ui';
import { IProduct } from '../../interfaces';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<PropsWithChildren<Props>> = ({
  editable = false,
  products,
}) => {
  const { cart, removeCartProduct } = useContext(CartContext);
  const { role } = useRole('user/rol');
  const rol = role.message === 'admin' ? 'federal' : role.message;
  const { updateCartQuantity } = useContext(CartContext);

  const productToShow = products ? products : cart;

  const updatedQuantity = (quantity: number, product: ICartProduct) => {
    
  };

  return (
    <>
      {productToShow.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            {/* Llevar a la pagina del producto */}
            <NextLink href={`/product/${rol}/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={6}>
            <Box display="7" flexDirection="column">
              <Typography variant="body2">{product.title}</Typography>
              <Typography variant="body1">
                Size: <strong>{product.size}</strong>
              </Typography>
              {/* Conditional */}
              {editable ? (
                <>
                  {product.needImages ? (
                    <UploadImageByCart product={product} />
                  ) : (
                    <Typography>Worker</Typography>
                  )}
                </>
              ) : (
                <Typography variant="h5">
                  {product.quantity} {product.title}
                  {product.quantity > 1 ? 's' : ''}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeCartProduct(product as ICartProduct)}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
