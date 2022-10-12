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

export const AddQuantity: FC<PropsWithChildren<Props>> = ({ product }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const { updateCartQuantity, cart } = useContext(CartContext);

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
              product!.quantity = 1
              updateCartQuantity(product as any)
            }
          }}
        />
      </Grid>
    </Grid>
  );
};
