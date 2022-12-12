import {
  FC,
  useState,
  PropsWithChildren,
  useContext,
  useRef,
  useEffect,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AddToPhotosOutlined, DeleteOutlined } from '@mui/icons-material';

import { Box, Grid, Typography, TextField, IconButton } from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { useFieldArray, useForm } from 'react-hook-form';

interface Props {
  product?: IOrderItem | ICartProduct;
}

type FormData = {
  usb: {
    name: string;
    quantity: number;
  }[];
};

export const AddInfoGifts: FC<PropsWithChildren<Props>> = ({ product }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { usb: [] } });
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'usb',
  });

  const { updateCartQuantity } = useContext(CartContext);

  useEffect(() => {
    setValue(
      'usb',
      product?.hasOwnProperty('information') ? product?.information.usb : []
    );
    getValues('usb').map(() => {
      append({});
    });
  }, [append, getValues]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateCartQuantity(product as ICartProduct);
    setOpen(false);
  };

  const onSaveInfo = async (data: FormData) => {
    let qty = 0;
    data.usb.map(({ quantity }) => {
      qty += Number(quantity);
    });
    product!.quantity = qty;
    product!.information = data;
    setValue('usb', data.usb);
    handleClose();
  };

  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color='secondary' onClick={handleClickOpen}>
          <AddToPhotosOutlined /> Add Info
        </Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <Box display='flex' justifyContent='space-between'>
            <Typography>Add Info</Typography>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSaveInfo)}>
          <DialogContent>
            {fields.map((field, index) => (
              <Grid container spacing={4} key={index}>
                <Grid item xs={12} sm={5} marginBottom={1}>
                  <TextField
                    variant='filled'
                    label='Name'
                    {...register(`usb.${index}.name`)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    {...register(`usb.${index}.quantity`)}
                    type='number'
                    variant='filled'
                    label='Quantity'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton
                    aria-label='delete'
                    onClick={() => remove(index)}
                    color='error'
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Button color='secondary' onClick={() => append({})} autoFocus>
              Add Names and QTY
            </Button>
            <Button type='submit' color='primary' autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
