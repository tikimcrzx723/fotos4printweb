import {
  FC,
  useState,
  PropsWithChildren,
  useRef,
  ChangeEvent,
  useContext,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AddToPhotosOutlined, UploadOutlined } from '@mui/icons-material';
import { appApi } from '../../api';
import { Box, Card, CardActions, CardMedia, Grid } from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { converters } from '../../libs';
import { CircularStatict } from './CircularStatict';
import Loader from './Loader';

interface Props {
  product: IOrderItem | ICartProduct;
}

export const UploadImageByCart: FC<PropsWithChildren<Props>> = ({
  product,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [disabledButton, setDisabledButton] = useState(true);
  const { updateCartQuantity } = useContext(CartContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      const images = [];
      for (const file of target.files) {
        const base64: any = await converters.returnBase64(file);
        const fileType = file.type.split('/')[0];
        const extension = file.type.split('/')[1];
        const path = `${product.title.replaceAll(
          ' ',
          '-'
        )}/${product.size?.replaceAll(' ', '-')}`;

        const uploadImage = { base64, fileType, extension, path };
        const { data } = await appApi.post<{ message: string }>(
          '/uploaders/clients/images/upload',
          uploadImage
        );
        images.push({
          image: data.message,
          quantity: 1,
        });
      }
      product.userImages = images;
      product.quantity = images.length;
      updateCartQuantity(product as ICartProduct);
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = async (image: string) => {};

  const onNewCartQuantityValue = async (product: ICartProduct) => {
    updateCartQuantity(product);
    // const {data} = appApi.post('');
    handleClose();
  };

  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color="primary" onClick={handleClickOpen}>
          <AddToPhotosOutlined /> Add your Images
        </Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Upload your images'}
        </DialogTitle>
        <DialogContent>
          <Box className="fadeIn">
            <Button
              color="secondary"
              fullWidth
              startIcon={<UploadOutlined />}
              onClick={() => fileInputRef.current?.click()}
              sx={{ mb: 3 }}
            >
              Upload Images
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFilesSelected}
              accept=".png, .jpg, .jpge, .JPGE, .pdf"
              style={{ display: 'none' }}
            />
            <Grid container spacing={3}>
              {product.userImages!.map((img) => (
                <Grid item key={img.image} xs={12} sm={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      className="fadeIn"
                      image={`https://afbrcpedgr.cloudimg.io/${img.image}?width=400`}
                      alt={img.image}
                    />
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
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => onNewCartQuantityValue(product as ICartProduct)}
            disabled={disabledButton}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
