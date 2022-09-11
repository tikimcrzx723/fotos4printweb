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
  type: '4/4' | '4/0';
};

const validTypes = [
  { code: '4/0', type: '4/0, full color front, no back' },
  { code: '4/4', type: '4/4, full color both side' },
];

export const AddInfoBussinesCard: FC<PropsWithChildren<Props>> = ({
  product,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [imagesCard, setImagesCard] = useState('');
  const [add40or44, setAdd40or44] = useState('4/0');
  const [addBackPhoto, setAddBackPhoto] = useState(false);
  const [backImage, setBackImage] = useState('');
  const [frontImage, setFrontImage] = useState('');
  const fileInputRefBack = useRef<HTMLInputElement>(null);
  const fileInputRefFront = useRef<HTMLInputElement>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    handleSubmit,
    setValue,
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
      if (product!.information.hasOwnProperty('back')) {
        console.log(product!.information.back);
        setBackImage(product!.information.back);
        setAdd40or44('4/4');
      }
      if (product!.information.hasOwnProperty('front')) {
        console.log(product!.information.front);
        setFrontImage(product!.information.front);
      }
    }
  }, [product]);

  const handleClose = () => {
    updateCartQuantity(product as ICartProduct);
    setOpen(false);
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    console.log(target.files!.length);

    if (target.files!.length > 1) {
      return;
    }

    if (imagesCard === 'front' || imagesCard === 'back') {
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
            name: `${product?.size}${imagesCard}`,
          };
          const { data } = await appApi.post<{ message: string }>(
            '/uploaders/clients/images/upload',
            uploadImage
          );
          const image = data.message;
          if (imagesCard === 'front') {
            setFrontImage(image);
          } else if (imagesCard === 'back') {
            setBackImage(image);
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const onSaveInfo = async (data: FormData) => {
    if (backImage.length > 0) {
      product!.information = {
        type: '4/4',
        back: backImage,
        front: frontImage,
      };
    } else {
      product!.information = { type: '4/0', front: frontImage };
    }

    product!.quantity = 1;
    updateCartQuantity(product as any);
    await appApi.post('/orders/cart', cart);
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
              <Grid item xs={12} sm={7}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    key={product?._id}
                    defaultValue={add40or44}
                    label="Type"
                    onChange={({ target }) => {
                      setValue('type', target.value as any, {
                        shouldValidate: true,
                      });
                      setAddBackPhoto(target.value === '4/4' ? true : false);
                    }}
                    variant="filled"
                  >
                    {validTypes.map(({ code, type }) => (
                      <MenuItem key={code} value={code}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                {frontImage.length === 0 ? (
                  <Button
                    onClick={() => {
                      fileInputRefFront.current?.click();
                      setImagesCard('front');
                    }}
                  >
                    <AddPhotoAlternateOutlined />
                    Add Photo Front
                  </Button>
                ) : (
                  <></>
                )}

                <input
                  ref={fileInputRefFront}
                  type="file"
                  multiple
                  onChange={onFilesSelected}
                  accept=".png, .jpg, .jpeg, .JPEG"
                  style={{ display: 'none' }}
                />
                {addBackPhoto ? (
                  <>
                    {backImage.length === 0 ? (
                      <Button
                        onClick={() => {
                          fileInputRefBack.current?.click();
                          setImagesCard('back');
                        }}
                      >
                        <AddPhotoAlternateOutlined />
                        Add Photo Back
                      </Button>
                    ) : (
                      <></>
                    )}

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
                  <></>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={2}>
              {frontImage.length > 0 ? (
                <Grid item xs={12} sm={6}>
                  Front
                  <Card sx={{ textAlign: 'center' }}>
                    <CardMedia
                      component="img"
                      className="fadeIn"
                      image={frontImage}
                      alt={product!.title}
                    />
                  </Card>
                  <Button
                    fullWidth
                    color="error"
                    onClick={() => {
                      onDeleteImage(frontImage);
                      setFrontImage('');
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              ) : (
                <></>
              )}
              {backImage.length > 0 ? (
                <Grid item xs={12} sm={6}>
                  Back
                  <Card sx={{ textAlign: 'center' }}>
                    <CardMedia
                      component="img"
                      className="fadeIn"
                      image={backImage}
                      alt={product!.title}
                    />
                  </Card>
                  <Button
                    fullWidth
                    color="error"
                    onClick={() => {
                      onDeleteImage(backImage);
                      setBackImage('');
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              ) : (
                <></>
              )}
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
