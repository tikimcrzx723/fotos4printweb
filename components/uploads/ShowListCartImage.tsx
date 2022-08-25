import { FC, PropsWithChildren, useContext } from 'react';
import { ItemCounter } from '../ui';
import { ICartProduct } from '../../interfaces';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { IUserImage } from '../../interfaces';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { CartContext } from '../../context';

interface IProp {
  product: ICartProduct;
  img: IUserImage;
  index: number;

  onDeleteImage: (image: string) => void;
}

export const ShowListCartImage: FC<PropsWithChildren<IProp>> = ({
  product,
  img,
  onDeleteImage,
  index,
}) => {
  const { updateCartQuantity, addProductToCart } = useContext(CartContext);
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (product.userImages![index].quantity === 1) return;
      product.userImages![index].quantity--;
      return updateCartQuantity(product);
    } else {
      if (product.userImages![index].quantity >= 1000) return;

      product.userImages![index].quantity++;
      return updateCartQuantity(product);
    }
  };
  return (
    <Grid item key={img.image} xs={12} sm={4}>
      <Card sx={{ textAlign: 'center' }}>
        <CardMedia
          component="img"
          className="fadeIn"
          image={`https://afbrcpedgr.cloudimg.io/${img.image}?width=400`}
          alt={product.title}
        />
        <Grid container marginTop={2} alignItems="center">
          <Grid item xs={4} sm={4}>
            <IconButton onClick={() => addOrRemove(-1)}>
              <RemoveCircleOutline sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {product.userImages![index].quantity}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <IconButton onClick={() => addOrRemove(+1)}>
              <AddCircleOutline sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
        </Grid>
        <CardActions>
          <Button
            fullWidth
            color="error"
            onClick={() => onDeleteImage(img.image)}
          >
            Delete
          </Button>
        </CardActions>

        {/* <Box display="flex" justifyContent="space-between">
          <IconButton onClick={() => addOrRemove(-1)}>
            <RemoveCircleOutline />
          </IconButton>
          <Typography sx={{ width: 40, textAlign: 'center' }}>
            {product.userImages![index].quantity}
          </Typography>
          <IconButton onClick={() => addOrRemove(+1)}>
            <AddCircleOutline />
          </IconButton>
        </Box> */}
      </Card>
    </Grid>
  );
};
