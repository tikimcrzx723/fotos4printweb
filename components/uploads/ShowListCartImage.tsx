import { FC, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { ICartProduct } from '../../interfaces';
import { AttachMoneyOutlined } from '@mui/icons-material';

import {
  Button,
  Card,
  CardActions,
  CardMedia,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { IUserImage } from '../../interfaces';
import { CartContext } from '../../context';

interface IProp {
  product: ICartProduct;
  img: IUserImage;
  index: number;
  viewInput?: boolean;

  onDeleteImage: (image: string) => void;
}

const validTicketValues = [
  { quantity: 50 },
  { quantity: 100 },
  { quantity: 150 },
  { quantity: 200 },
  { quantity: 250 },
  { quantity: 500 },
  { quantity: 750 },
  { quantity: 1000 },
  { quantity: 1250 },
  { quantity: 1500 },
  { quantity: 1750 },
  { quantity: 2000 },
];

export const ShowListCartImage: FC<PropsWithChildren<IProp>> = ({
  product,
  img,
  viewInput = true,
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
            image="/pdf.png"
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

        {product.title.toLowerCase().includes('event') ? (
          <>
            <FormControl></FormControl>
            <Select
              disabled={!viewInput}
              variant="filled"
              fullWidth
              value={
                product.userImages![index].quantity < 50
                  ? 50
                  : product.userImages![index].quantity
              }
              label="QTY"
              onChange={({ target }) => {
                const qty = Number(target.value);

                product.userImages![index].quantity = qty;
                product.userImages![index].information = {
                  price: product.userImages![index].hasOwnProperty(
                    'information'
                  )
                    ? product.userImages![index].information.hasOwnProperty(
                        'price'
                      )
                    : (product.userImages![index].information = {price:5}),
                };
                updateCartQuantity(product);
              }}
            >
              {validTicketValues.map(({ quantity }) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </Select>
            <TextField
              disabled={!viewInput}
              type="number"
              variant="filled"
              fullWidth
              prefix="$"
              label="price"
              inputProps={{
                min: 0,
                style: { textAlign: 'center', fontSize: 22 },
              }}
              value={
                product.userImages![index].hasOwnProperty('information')
                  ? product.userImages![index].information.price
                  : 5
              }
              onChange={({ target }) => {
                const valueType = Number(target.value);
                if (valueType < 0) return;
                product.userImages![index].information = {
                  price: Number(target.value),
                };
                updateCartQuantity(product);
              }}
            />
          </>
        ) : (
          <TextField
            disabled={!viewInput}
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
        )}
        <CardActions>
          {viewInput ? (
            <Button
              fullWidth
              color="error"
              onClick={() => onDeleteImage(img.image)}
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
