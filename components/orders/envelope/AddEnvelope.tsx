/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  AddPhotoAlternateOutlined,
  AddToPhotosOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useState,
  useContext,
  useRef,
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

export const AddEnvelope: FC<PropsWithChildren<Props>> = ({
  product,
  editable = true,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [imagesCard, setImagesCard] = useState('');
  const [qtyEnvelope, setQtyEnvelope] = useState(250);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const fileInputRefLogo = useRef<HTMLInputElement>(null);

  const {
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const { updateCartQuantity, cart } = useContext(CartContext);
  const imageEnvelope =
    'https://f4pstorage.nyc3.digitaloceanspaces.com/products/photo/cfdd1a5c-43d6-48fc-88bb-3bf609e67015.jpeg';

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
        setImagesCard(image);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onSaveInfo = async () => {
    const envelopeInfo = [
      {
        street,
        state,
        city,
        zipCode,
        logo: imagesCard,
        type: 'none',
      },
    ];

    let discount = 0;

    product!.quantity = qtyEnvelope;
    product!.information = envelopeInfo;
    product!.added!.forEach((add) => {
      if (qtyEnvelope > Number(add.complement)) {
        discount = add.increment;
        envelopeInfo[0].type = add.complement;
      }
    });

    const resulPrice = product!.priceBase! - discount;
    product!.price = Math.round(resulPrice * 100) / 100;

    updateCartQuantity(product as any);
    await appApi.post('/orders/cart', cart);

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
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <img width="80%" src={imageEnvelope} alt="envelope" />
              {imagesCard.length > 0 ? (
                <img
                  style={{
                    marginLeft: '-75%',
                    marginBottom: '25%',
                    display: `${imagesCard.length === 0 ? '' : imagesCard}`,
                  }}
                  width="15%"
                  src={imagesCard}
                  alt="envelope logo"
                />
              ) : (
                <></>
              )}
              <Typography
                style={{
                  position: 'absolute',
                  top: '38%',
                  left: '9%',
                  fontSize: '12px',
                }}
              >
                {street}
              </Typography>
              <Typography
                style={{
                  position: 'absolute',
                  top: '41%',
                  left: '9%',
                  fontSize: '12px',
                }}
              >
                {`${city}, ${state} #${zipCode}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Street"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                variant="filled"
                style={{ marginTop: 10 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="State"
                onChange={(e) => {
                  setState(e.target.value);
                }}
                variant="filled"
                style={{ marginTop: 10 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                variant="filled"
                style={{ marginTop: 10 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Zip Code"
                onChange={(e) => setZipCode(e.target.value)}
                variant="filled"
                style={{ marginTop: 10 }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item marginTop={4} xs={12} sm={6}>
              <Button
                color="secondary"
                onClick={() => {
                  fileInputRefLogo.current?.click();
                  setImagesCard('');
                }}
              >
                <AddPhotoAlternateOutlined />
                Add Logo
              </Button>
              <input
                ref={fileInputRefLogo}
                type="file"
                multiple
                onChange={onFilesSelected}
                accept=".png, .jpg, .jpeg, .JPEG"
                style={{ display: 'none' }}
              />
            </Grid>
            <Grid item marginTop={1} xs={12} sm={6}>
              <TextField
                variant="filled"
                type="number"
                placeholder="QTY Envelope"
                onChange={(e) => {
                  const valueQty = Number(e.target.value);
                  setQtyEnvelope(valueQty < 250 ? 250 : valueQty);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => onSaveInfo()}
            type="submit"
            color="primary"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
