import { FC, PropsWithChildren, useContext } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CartContext } from '../../context/cart';
import { ICartProduct, IOrderItem, IUserImage } from '../../interfaces';
import { UploadImageByCart } from '../uploads/UploadImageByCart';
import { useRole } from '../../hooks';
import { appApi } from '../../api';
import { AddInfoBussinesCard, AddQuantity, AddInfoGifts } from '../orders';
import { downLoadImage } from '../../libs';
import { AddCalendarInfo } from '../orders/AddCalendarInfo';

interface Props {
  editable?: boolean;
  admin?: boolean;
  products?: IOrderItem[];
  onDownloadImage?: (images: IUserImage[], name: string) => void;
  onDownloadCardAndPost?: (
    information: [{ type: string; front: string; back: string }]
  ) => void;
  orderId?: string;
  saveOrder?: boolean;
}

export const CartList: FC<PropsWithChildren<Props>> = ({
  editable = false,
  admin = false,
  saveOrder = false,
  products,
  onDownloadImage,
  onDownloadCardAndPost,
  orderId,
}) => {
  const { cart, removeCartProduct } = useContext(CartContext);
  const { role } = useRole('user/rol');
  const rol = role.message === 'admin' ? 'federal' : role.message;

  const returnImage = (product: IOrderItem) => {
    if (
      product.title.toLowerCase().includes('event') ||
      product.title.toLowerCase().includes('flye')
    ) {
      return `https://afbrcpedgr.cloudimg.io/${product.image}?width=800`;
    } else if (product.size.includes('http')) {
      return `https://afbrcpedgr.cloudimg.io/${product.size}?width=800`;
    } else {
      return `https://afbrcpedgr.cloudimg.io/${product.image}?width=800`;
    }
  };

  const returnUploads = (product: IOrderItem | ICartProduct) => {
    const title = product.title.toLowerCase();

    if (product.needImages) {
      if (title.includes('usb')) {
        return <AddInfoGifts product={product} />;
      } else if (title.includes('bussines') || title.includes('postcard')) {
        return <AddInfoBussinesCard product={product} />;
      } else {
        return <UploadImageByCart product={product} />;
      }
    } else {
      if (title.includes('calenda')) {
        return <AddCalendarInfo product={product} />;
      } else {
        return <AddQuantity product={product} />;
      }
    }
  };

  const onRemoveCartProduct = async (product: ICartProduct) => {
    removeCartProduct(product);
    if (product.userImages !== null) {
      if (product.userImages!.length > 0) {
        product.userImages!.map(async ({ image }) => {
          await appApi.post('/uploaders/clients/images/delete', { url: image });
        });
      }
    }
    const auxProducts = cart.filter((p) => p !== product);
    await appApi.post('/orders/cart', auxProducts);
  };

  const productToShow = products ? products : cart;

  return (
    <>
      {productToShow.map((product, index) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size + index}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${rol}/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={returnImage(product as any)}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={6}>
            <Box display='7' flexDirection='column'>
              {product.title.includes('USB') &&
              product.hasOwnProperty('information') ? (
                product.information.usb.map(
                  (data: any) => `[${data.quantity}]-${data.name}\n`
                )
              ) : (
                <></>
              )}
              {editable ? (
                returnUploads(product)
              ) : (
                <>
                  <Typography variant='h5'>
                    {product.quantity} {product.title}
                    {product.quantity > 1 ? 's' : ''}
                  </Typography>
                  {product.needImages ? (
                    <Typography variant='h5'>{product.size}</Typography>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            <Typography variant='subtitle1'>${product.price}</Typography>
            {admin &&
            (product.title.includes('Bussines') ||
              product.title.includes('PostCard')) ? (
              <Button
                color='secondary'
                onClick={() => onDownloadCardAndPost!(product.information!)}
              >
                Download
              </Button>
            ) : admin ? (
              product.needImages ? (
                <Button
                  color='secondary'
                  className='circular-btn'
                  onClick={() =>
                    onDownloadImage!(product.userImages!, product.title)
                  }
                >
                  Download
                </Button>
              ) : product.title.includes('USB') ? (
                product.information.hasOwnProperty('name') ? (
                  <Typography>{product.information.name}</Typography>
                ) : (
                  <Button
                    sx={{ marginTop: 1 }}
                    color='secondary'
                    className='circular-btn'
                    onClick={() => downLoadImage(product.information.logo)}
                  >
                    Logo
                  </Button>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => onRemoveCartProduct(product as ICartProduct)}
              >
                Remove
              </Button>
            )}
            {(product.needImages &&
              editable === false &&
              admin === false &&
              product.title === 'Bussines Card 2 x 3.5') ||
            (product.needImages &&
              editable === false &&
              admin === false &&
              product.title === 'PostCard') ? (
              <AddInfoBussinesCard editable={false} product={product} />
            ) : product.needImages && editable === false && admin === false ? (
              <UploadImageByCart title='View Images' product={product} />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
