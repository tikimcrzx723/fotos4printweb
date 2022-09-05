import {
  FC,
  useState,
  PropsWithChildren,
  useContext,
  useRef,
  ChangeEvent,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AddToPhotosOutlined } from '@mui/icons-material';

import { Box, Grid, TextField, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { useForm } from 'react-hook-form';

interface Props {
  product: IOrderItem | ICartProduct;
}

type FormData = {
  name: string;
  quantity: number;
};

export const AddInfoGifts: FC<PropsWithChildren<Props>> = ({ product }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      quantity: 1,
    },
  });

  const { updateCartQuantity } = useContext(CartContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateCartQuantity(product as ICartProduct);
    setOpen(false);
  };

  const onSaveInfo = (data: FormData) => {
    const information = { name: data.name, quantity: Number(data.quantity) };
    product.quantity = Number(information.quantity);
    product.information = information;
    updateCartQuantity(product as ICartProduct);
    handleClose();
  };

  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color="secondary" onClick={handleClickOpen}>
          <AddToPhotosOutlined /> Add Info
        </Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Box display="flex" justifyContent="space-between">
            <Typography>Add Info</Typography>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSaveInfo)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('name', {
                    required: 'This a required',
                  })}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  type="number"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('quantity', {
                    required: 'This a required',
                    min: 1,
                  })}
                  helperText={errors.name?.message}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
