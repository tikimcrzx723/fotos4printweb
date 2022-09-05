import { FC, PropsWithChildren, useContext, useState } from 'react';
import { ICartProduct } from '../../interfaces';

import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { IUserImage } from '../../interfaces';
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
  const { updateCartQuantity } = useContext(CartContext);

  return (
    <Grid item key={img.image} xs={12} sm={4}>
      <Card sx={{ textAlign: 'center' }}>
        {img.image.split('.')[img.image.split('.').length - 1] === 'pdf' ? (
          <CardMedia
            component="img"
            className="fadeIn"
            image='/pdf.png'
            alt={product.title}
          />
        ) : (
          <CardMedia
            component="img"
            className="fadeIn"
            image={`https://afbrcpedgr.cloudimg.io/${img.image}?width=400`}
            alt={product.title}
          />
        )}

        <Grid container marginTop={2} alignItems="center">
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              variant="filled"
              inputProps={{
                min: 0,
                style: { textAlign: 'center', fontSize: 22 },
              }}
              defaultValue={product.userImages![index].quantity}
              onChange={({ target }) => {
                const qty = Number(target.value) > 0 ? Number(target.value) : 1;
                product.userImages![index].quantity = qty;
                updateCartQuantity(product);
              }}
            />
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {product.userImages![index].quantity}
            </Typography>
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
