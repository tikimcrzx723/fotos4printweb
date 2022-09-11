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
import {
  AddPhotoAlternateOutlined,
  AddToPhotosOutlined,
} from '@mui/icons-material';

import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  TextField,
} from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { converters } from '../../libs';
import { appApi } from '../../api';
import { useEffect } from 'react';

interface Props {
  product?: IOrderItem | ICartProduct;
}

type FormData = {
  price: number;
  image: string;
};

export const AddInfoTickets: FC<PropsWithChildren<Props>> = ({ product }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const fileInputRefBack = useRef<HTMLInputElement>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const { updateCartQuantity, cart } = useContext(CartContext);

  const onDeleteImage = async (image: string) => {
    updateCartQuantity(product as any);
    await appApi.post('/uploaders/clients/images/delete', { url: image });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (product!.hasOwnProperty('information')) {
      if (product!.information.hasOwnProperty('image')) {
        setImage(product!.information.image);
      }
    }
  }, [product]);

  const handleClose = () => {
    updateCartQuantity(product as ICartProduct);
    setOpen(false);
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files!.length > 1) {
      return;
    }

    try {
      for (const file of target.files as any) {
        const base64: any = await converters.returnBase64(file);
        const fileType = file.type.split('/')[0];
        const extension = file.type.split('/')[1];
        const path = `${product!.title.replaceAll(
          ' ',
          '-'
        )}/${product!.size?.replaceAll(' ', '-')}`;
        const uploadImage = {
          base64,
          fileType,
          extension,
          path,
          name: `${product?.size}`,
        };
        const { data } = await appApi.post<{ message: string }>(
          '/uploaders/clients/images/upload',
          uploadImage
        );
        const image = data.message;
        setImage(image);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onSaveInfo = async (data: FormData) => {
    if (image.length > 0) {
      product!.information = { image, price: data.price };
      product!.quantity = 1;
      updateCartQuantity(product as any);
      await appApi.post('/orders/cart', cart);
      handleClose();
    }
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
              <Grid item xs={12} sm={7}>
                {image.length === 0 ? (
                  <>
                    <Button onClick={() => fileInputRefBack.current?.click()}>
                      <AddPhotoAlternateOutlined />
                      Add Photo Back
                    </Button>
                    <input
                      ref={fileInputRefBack}
                      type="file"
                      multiple
                      onChange={onFilesSelected}
                      accept=".png, .jpg, .jpeg, .JPEG"
                      style={{ display: 'none' }}
                    />
                  </>
                ) : (
                  <>
                    <Card sx={{ textAlign: 'center' }}>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={image}
                        alt={product!.title}
                      />
                    </Card>
                    <Button
                      fullWidth
                      color="error"
                      onClick={() => {
                        onDeleteImage(image);
                        setImage('');
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="price"
                  type="number"
                  {...register('price', {
                    min: 1,
                    required: 'This field is required',
                  })}
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
