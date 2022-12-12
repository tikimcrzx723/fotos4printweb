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

import { Box, Grid, Typography, CardMedia } from '@mui/material';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { Add4440Images } from './bussinescard/Add4440Images';
import { CartContext } from '../../context';
import appApi from '../../api/appApi';

interface Props {
  product?: IOrderItem | ICartProduct;
  editable?: boolean;
}

const validTypes = [
  { code: '4/0', type: '4/0, full color front, no back' },
  { code: '4/4', type: '4/4, full color both side' },
];

export const AddInfoBussinesCard: FC<PropsWithChildren<Props>> = ({
  product,
  editable = true,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { updateCartQuantity, cart } = useContext(CartContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDeleteCard = async (images: {
    type: string;
    front: string;
    back: string;
  }) => {
    const updatedCardInfo = product?.information.filter(
      (img: any) => img.front !== images.front
    );
    const cardUpdated = updatedCardInfo === undefined ? [] : updatedCardInfo;
    product!.information = cardUpdated;
    product!.quantity = cardUpdated.length;
    await appApi.post('/uploaders/clients/images/delete', {
      url: images.front,
    });
    if ((images.type = '4/4')) {
      await appApi.post('/uploaders/clients/images/delete', {
        url: images.back,
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
              component='img'
              className='fadeIn'
              image={images.front}
              alt={product.title}
            />
            {editable ? (
              <Button
                onClick={() => onDeleteCard(images)}
                sx={{ marginTop: 1 }}
                color='error'
                fullWidth
              >
                <DeleteForeverOutlined /> Delete
              </Button>
            ) : (
              <></>
            )}
          </Grid>
        ))}
      </Grid>
    );
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
            <Typography>Business Card</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>{renderImages(product as any)}</DialogContent>
        <DialogActions>
          {editable ? <Add4440Images product={product} /> : <></>}
          <Button
            onClick={handleClose}
            sx={{ marginLeft: 2 }}
            type='submit'
            color='error'
            autoFocus
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
