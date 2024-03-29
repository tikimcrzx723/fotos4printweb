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
import { Box, Grid } from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { converters } from '../../libs';
import { ShowListCartImage, Loader } from './';

interface Props {
  title?: string;
  product: IOrderItem | ICartProduct;
  editable?: boolean;
}

export const UploadImageByCart: FC<PropsWithChildren<Props>> = ({
  title = 'Add your images',
  product,
  editable = true,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [counterImagesAdd, setCounterImagesAdd] = useState(0);
  const [imagesLengt, setImagesLengt] = useState(0);
  const [chargerImages, setChargerImages] = useState(false);

  const { updateCartQuantity, cart } = useContext(CartContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateCartQuantity(product as ICartProduct);
    setOpen(false);
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    setImagesLengt(target.files.length);
    console.log(product.title.toLowerCase().includes('event'));

    setChargerImages(true);

    try {
      const images = product.userImages?.length === 0 ? [] : product.userImages;

      let i = 0;
      for (const file of target.files) {
        const base64: any = await converters.returnBase64(file);
        const fileType = file.type.split('/')[0];
        const extension = file.type.split('/')[1];
        const path = `${product.title.replaceAll(
          ' ',
          '-'
        )}/${product.size?.replaceAll(' ', '-')}`;

        const uploadImage = {
          base64,
          fileType,
          extension,
          path,
          name: `${images?.length}-${product.title}-${product.size}-image-${Date.now().toString()}`,
        };
        const { data } = await appApi.post<{ message: string }>(
          '/uploaders/clients/images/upload',
          uploadImage
        );
        images!.push({
          image: data.message,
          quantity: product.title.toLowerCase().includes('event') ? 50 : 1,
        });

        i++;
        setCounterImagesAdd(i);
      }

      product.userImages = images;
      product.quantity = product
        .userImages!.map((item) => item.quantity)
        .reduce((prev, curr) => prev + curr, 0);
      updateCartQuantity(product as ICartProduct);
      await appApi.post('/orders/cart', cart);
      setCounterImagesAdd(0);
      setChargerImages(false);
    } catch (error) {
      console.log({ error });
      updateCartQuantity(product as ICartProduct);
      setChargerImages(false);
    }
  };

  const onDeleteImage = async (image: string) => {
    updateCartQuantity(product as any);
    const images = product.userImages?.filter((img) => img.image !== image);
    const qty = product.userImages?.find(
      (img) => img.image === image
    )?.quantity;
    product.userImages = images;
    product.quantity = product.quantity - qty!;
    await appApi.post('/uploaders/clients/images/delete', { url: image });
    updateCartQuantity(product as any);
  };

  const onNewCartQuantityValue = async (product: ICartProduct) => {
    let qty = 0;
    product.userImages?.map((img) => {
      qty += img.quantity;
    });
    product.quantity = qty;
    updateCartQuantity(product);

    await appApi.post('/orders/cart', cart);

    handleClose();
  };

  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color="primary" onClick={handleClickOpen}>
          {title === 'Add your images' ? <AddToPhotosOutlined /> : <></>}
          {title}
        </Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <Box className="fadeIn">
            {chargerImages === false ? (
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  mb: 3,
                  display: title === 'Add your images' ? '' : 'none',
                }}
              >
                Upload Images
              </Button>
            ) : (
              <Loader
                key={product._id}
                counterCharger={counterImagesAdd}
                quantityImages={imagesLengt}
              />
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFilesSelected}
              accept=".png, .jpg, .jpeg, .JPEG, .pdf"
              style={{ display: 'none' }}
            />
            <Grid container spacing={3}>
              {!chargerImages ? (
                product.userImages!.map((img, index) => (
                  <ShowListCartImage
                    viewInput={title === 'Add your images' ? true : false}
                    key={img.image}
                    product={product as ICartProduct}
                    img={img}
                    index={index}
                    onDeleteImage={onDeleteImage}
                  />
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          {title === 'Add your images' ? (
            <>
              <Button color="error" autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => onNewCartQuantityValue(product as ICartProduct)}
                autoFocus
              >
                Save
              </Button>
            </>
          ) : (
            <Button color="error" autoFocus onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
