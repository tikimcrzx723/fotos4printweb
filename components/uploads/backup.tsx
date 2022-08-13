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
  import { UploadOutlined } from '@mui/icons-material';
  import { appApi } from '../../api';
  import { Box, Card, CardActions, CardMedia, Grid } from '@mui/material';
  import { CartContext } from '../../context';
  import { ICartProduct, IOrderItem } from '../../interfaces';
  import { converters } from '../../libs';
  
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
    const [viewImage, setViewImage] = useState<string[]>([]);
    const [base64Images, setBase64Images] = useState<
      {
        base64: any;
        fileType: string;
        extension: string;
        image: string;
        path: string;
      }[]
    >([]);
    const [imagesServer, setImagesServer] = useState([]);
    const [sendFileS3, setSendFileS3] = useState(false);
    const [loadImages, setLoadImages] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const { updateCartQuantity } = useContext(CartContext);
  
    const handleClickOpen = () => {
      console.log(product.title + '/' + product.size?.replaceAll(' ', '-'));
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
        const images64 = base64Images;
        const viewImages: string[] = viewImage;
  
        for (const file of target.files) {
          const image = URL.createObjectURL(file);
          const base64: any = await converters.returnBase64(file);
          const fileType = file.type.split('/')[0];
          const extension = file.type.split('/')[1];
          const path = `${product.title.replaceAll(
            ' ',
            '-'
          )}/${product.size?.replaceAll(' ', '-')}`;
  
          const uploadImage = { base64, fileType, extension, image, path };
  
          images64.push(uploadImage);
          viewImages.push(image);
        }
        product.tempImages = viewImages;
        updateCartQuantity(product as any);
        setBase64Images(images64 as any);
        setViewImage(viewImages as any);
  
        if (viewImage.length === 0 || viewImages.length === 0)
          setDisabledButton(true);
        else setDisabledButton(false);
      } catch (error) {
        console.log({ error });
      }
    };
  
    const onDeleteImage = async (image: string) => {
      const removeImageView = viewImage.filter((img) => img !== image);
      const removeImageBase64Image = base64Images.filter(
        (base64) => base64.image === image
      );
  
      setBase64Images(removeImageBase64Image);
      product.tempImages = removeImageView;
      setViewImage(removeImageView);
  
      if (product.quantity > 0) {
        product.quantity = product.quantity - 1;
        product.tempImages = viewImage;
        if (sendFileS3) {
          const { data } = await appApi.post<{ message: string }>(
            '/uploaders/clients/images/delete',
            { image }
          );
          console.log(data.message);
        }
        updateCartQuantity(product as ICartProduct);
      }
    };
  
    const returnImagesServer = async () => {
      const imagesAux = imagesServer as any;
  
      for (const image64 of base64Images) {
        const { data } = await appApi.post<{ message: string }>(
          '/uploaders/clients/images/upload',
          image64
        );
        const imageUser = { image: data.message, quantity: 1 };
        imagesAux.push(imageUser);
      }
  
      return imagesAux;
    };
  
    const onNewCartQuantityValue = async (
      product: ICartProduct,
      newQuantityValue: number
    ) => {
      setSendFileS3(true);
      product.quantity = newQuantityValue;
      const imagesUser = await returnImagesServer();
      setImagesServer(imagesUser as any);
  
      product.userImages = imagesUser;
  
      updateCartQuantity(product);
      handleClose();
    };
  
    return (
      <div>
        <Box marginBottom={2} marginTop={2}>
          <Button color='primary' onClick={handleClickOpen}>
            Add your Images
          </Button>
        </Box>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby='responsive-dialog-title'
        >
          <DialogTitle id='responsive-dialog-title'>
            {'Upload your images'}
          </DialogTitle>
          <DialogContent>
            <Box className='fadeIn'>
              <Button
                color='secondary'
                fullWidth
                startIcon={<UploadOutlined />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ mb: 3 }}
              >
                Upload Images
              </Button>
              <input
                ref={fileInputRef}
                type='file'
                multiple
                onChange={onFilesSelected}
                accept='.png, .jpg, .jpge, .JPGE, .pdf'
                style={{ display: 'none' }}
              />
              <Grid container spacing={3}>
                {product.tempImages!.map((img) => (
                  <Grid item key={img} xs={12} sm={4}>
                    <Card>
                      <CardMedia
                        component='img'
                        className='fadeIn'
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          fullWidth
                          color='error'
                          onClick={() => onDeleteImage(img)}
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
            <Button color='error' autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color='primary'
              onClick={() =>
                onNewCartQuantityValue(product as ICartProduct, viewImage.length)
              }
              disabled={disabledButton}
              autoFocus
            >
              Save Images
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  