import { FC, useState, PropsWithChildren, useContext } from 'react';
import { Grid, TextField } from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface Props {
  product?: IOrderItem | ICartProduct;
}

type FormData = {
  price: number;
  image: string;
};

export const AddQuantity: FC<PropsWithChildren<Props>> = ({ product }) => {
  const [image, setImage] = useState('');
  const {
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const { updateCartQuantity } = useContext(CartContext);

  useEffect(() => {
    if (product!.hasOwnProperty('information')) {
      if (product!.information.hasOwnProperty('image')) {
        setImage(product!.information.image);
      }
    }
  }, [product]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} marginTop={2}>
        <TextField
          type="number"
          variant="filled"
          defaultValue={product?.quantity}
          inputProps={{
            min: 1,
            style: { textAlign: 'center', fontSize: 20, height: 4 },
          }}
          onChange={({ target }) => {
            if (Number(target.value) > 0) {
              product!.quantity = Number(target.value);
              updateCartQuantity(product as any);
            } else {
              product!.quantity = 1;
              updateCartQuantity(product as any);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};
