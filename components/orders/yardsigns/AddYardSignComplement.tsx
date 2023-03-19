import { FC, useState, PropsWithChildren, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  AddToPhotosOutlined,
  DeleteForeverOutlined,
} from '@mui/icons-material';

import { Box, Grid, Typography, CardMedia, TextField } from '@mui/material';
import { ICartProduct, IOrderItem } from '../../../interfaces';
import { CartContext } from '../../../context';
import appApi from '../../../api/appApi';
import { CardYardSign } from './CardYardSign';

interface Props {
  product?: IOrderItem | ICartProduct;
  editable?: boolean;
}

export const AddYardSignComplement: FC<PropsWithChildren<Props>> = ({
  product,
  editable = true,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { updateCartQuantity } = useContext(CartContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    let qty = 0;

    console.log(product);

    if (product!.hasOwnProperty('information')) {
      product?.information!.map((images: any, index: number) => {
        qty += product.information[index].quantity;
      });
      product!.quantity = qty;
      updateCartQuantity(product as any);
    }

    setOpen(false);
  };

  const onDeleteCard = async (
    type: string,
    back: string = '',
    front: string = '',
    quantity: number
  ) => {
    const updatedCardInfo = product?.information.filter(
      (img: any) => img.front !== front
    );
    const cardUpdated = updatedCardInfo === undefined ? [] : updatedCardInfo;
    product!.information = cardUpdated;
    product!.quantity = product!.quantity - quantity;

    await appApi.post('/uploaders/clients/images/delete', {
      url: front,
    });

    if (type === '4/4') {
      await appApi.post('/uploaders/clients/images/delete', {
        url: back,
      });
    }

    updateCartQuantity(product as any);
  };

  const renderImages = (product: ICartProduct | IOrderItem) => {
    if (!product.hasOwnProperty('information')) return <></>;
    if (!product.information.hasOwnProperty('length')) return <></>;
    return (
      <Grid spacing={4} container>
        {product?.information!.map((images: any, index: number) => (
          <Grid key={images.front + index} item xs={4} md={4}>
            <CardMedia
              component="img"
              className="fadeIn"
              image={images.front}
              alt={product.title}
            />
            <>
              <TextField
                disabled={!editable}
                defaultValue={product.information[index].quantity}
                variant={'filled'}
                type="number"
                inputProps={{
                  min: 1,
                  style: {
                    textAlign: 'center',
                    fontSize: 20,
                    height: 7,
                  },
                }}
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    product.information[index].quantity = Number(
                      e.target.value
                    );
                  }
                }}
              />
              <Button
                onClick={() => {
                  onDeleteCard(
                    product.information[index].type,
                    product.information[index].back,
                    product.information[index].front,
                    product.information[index].quantity
                  );
                }}
                sx={{ marginTop: 1, display: editable ? '' : 'none' }}
                fullWidth
                color="error"
              >
                Delete
              </Button>
              {/* <Button
                  sx={{ marginTop: 2 }}
                  color="primary"
                  fullWidth
                  onClick={handleClickOpen}
                >
                  <AddToPhotosOutlined /> Add Images
                </Button> */}
              {product.information[index].type === '4/4' ? (
                <Typography variant="h6" textAlign="center">
                  Two Sides
                </Typography>
              ) : (
                <Typography variant="h6" textAlign="center">
                  One Side
                </Typography>
              )}
            </>
          </Grid>
        ))}
      </Grid>
    );
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
          <Box display="flex" justifyContent="center">
            <Typography variant="h4" textAlign="center">
              Yard Sign
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>{renderImages(product as any)}</DialogContent>
        <DialogActions>
          {editable ? <CardYardSign product={product} /> : <></>}
          <Button
            onClick={handleClose}
            sx={{ marginLeft: 2 }}
            type="submit"
            color="error"
            autoFocus
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
