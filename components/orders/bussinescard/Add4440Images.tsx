import {
  AddPhotoAlternateOutlined,
  AddToPhotosOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useRef,
  useState,
  useContext,
} from 'react';
import { ICartProduct, IOrderItem } from '../../../interfaces';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { converters } from '../../../libs';
import { appApi } from '../../../api';
import { CartContext } from '../../../context';

interface Props {
  product?: IOrderItem | ICartProduct;
  editable?: boolean;
}

type FormData = {
  type: '4/4' | '4/0';
};

const validTypes = [
  { code: '4/0', type: '4/0, full color front, no back' },
  { code: '4/4', type: '4/4, full color both side' },
];

export const Add4440Images: FC<PropsWithChildren<Props>> = ({
  product,
  editable = true,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [imagesCard, setImagesCard] = useState('');
  const [add40or44, setAdd40or44] = useState('4/0');
  const [addBackPhoto, setAddBackPhoto] = useState(false);
  const [backImage, setBackImage] = useState('');
  const [frontImage, setFrontImage] = useState('');
  const fileInputRefBack = useRef<HTMLInputElement>(null);
  const fileInputRefFront = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const { updateCartQuantity, cart } = useContext(CartContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
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
            name: `${product?.size}${imagesCard}-${Date.now().toString()}`,
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

  const onDeleteImage = async (image: string, side = 'front') => {
    if (product!.quantity >= 1) {
      product!.quantity = product!.quantity - 1;
    }
    if (side === 'front') {
      product!.information.front = '';
      setFrontImage('');
    } else {
      product!.information.back = '';
      setBackImage('');
    }

    updateCartQuantity(product as any);
    await appApi.post('/uploaders/clients/images/delete', { url: image });
  };

  const save4440 = (product: ICartProduct | IOrderItem | undefined) => {
    const infoArr: any = product!.hasOwnProperty('information')
      ? product!.information
      : [];
      console.log(infoArr);

    if (add40or44 === '4/4' && backImage.length > 0 && frontImage.length > 0) {

      infoArr.push({
        type: '4/4',
        back: backImage,
        front: frontImage,
      });
      product!.information = infoArr!;
      product!.quantity = product!.information.length;
    } else if (add40or44 === '4/0' && frontImage.length > 0) {
      infoArr.push({
        type: '4/0',
        front: frontImage,
      });
      product!.information = infoArr;
      product!.quantity = product!.information.length;
    }
  };

  const onSaveInfo = async (data: FormData) => {
    save4440(product);

    updateCartQuantity(product as any);
    await appApi.post('/orders/cart', cart);
    setFrontImage('');
    setBackImage('');
    handleClose();
  };

  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color="primary" onClick={handleClickOpen}>
          <AddToPhotosOutlined /> Add Images
        </Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit(onSaveInfo)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    key={product?._id}
                    value={add40or44}
                    label="Type"
                    onChange={({ target }) => {
                      setValue('type', target.value as any, {
                        shouldValidate: true,
                      });
                      setAdd40or44(target.value);
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
                      accept=".png, .jpg, .jpeg, .JPEG, .pdf"
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
                      image={`https://cdwjpmyywa.cloudimg.io/${frontImage}?width=400`}
                      alt={product!.title}
                    />
                  </Card>
                  {editable ? (
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
                  ) : (
                    <></>
                  )}
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
                      image={`https://cdwjpmyywa.cloudimg.io/${backImage}?width=400`}
                      alt={product!.title}
                    />
                  </Card>
                  <Button
                    fullWidth
                    color="error"
                    onClick={() => {
                      onDeleteImage(backImage, 'back');
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
            <Button color="error" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
