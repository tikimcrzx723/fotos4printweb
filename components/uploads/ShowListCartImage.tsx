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
  TextField,
  Typography,
} from '@mui/material';
import { IUserImage } from '../../interfaces';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { CartContext } from '../../context';

interface IProp {
  addOrRemoveValue: number;
  product: ICartProduct;
  img: IUserImage;
  index: number;

  onDeleteImage: (image: string) => void;
}

export const ShowListCartImage: FC<PropsWithChildren<IProp>> = ({
  addOrRemoveValue = 1,
  product,
  img,
  onDeleteImage,
  index,
}) => {
  const { updateCartQuantity } = useContext(CartContext);
  const addOrRemove = (value: number) => {
    const qty = product.userImages![index].quantity;
    const condition = qty + value;
    if (condition > 0) {
      product.userImages![index].quantity += value;
      updateCartQuantity(product);
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
            <IconButton onClick={() => addOrRemove(-addOrRemoveValue)}>
              <RemoveCircleOutline sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {product.userImages![index].quantity}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <IconButton onClick={() => addOrRemove(+addOrRemoveValue)}>
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
      </Card>
    </Grid>
  );
};
