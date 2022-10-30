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
import { useRouter } from 'next/router';

interface Props {
  editable?: boolean;
  admin?: boolean;
  products?: IOrderItem[];
  onDownloadImage?: (images: IUserImage[], name: string) => void;
  orderId?: string;
  saveOrder?: boolean;
}

export const CartList: FC<PropsWithChildren<Props>> = ({
  editable = false,
  admin = false,
  saveOrder = false,
  products,
  onDownloadImage,
  orderId,
}) => {
  const { push } = useRouter();
  const { cart, removeCartProduct } = useContext(CartContext);
  const { role } = useRole('user/rol');
  const rol = role.message === 'admin' ? 'federal' : role.message;

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
            {/* Llevar a la pagina del producto */}
            <NextLink href={`/product/${rol}/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={
                      product.size?.includes('http')
                        ? product.size
                        : product.hasOwnProperty('information')
                        ? product.title.toLowerCase().includes('event')
                          ? `https://afbrcpedgr.cloudimg.io/${product.image}?width=400`
                          : product.title.toLowerCase().includes('flyer')
                          ? `https://afbrcpedgr.cloudimg.io/${product.image}?width=400`
                          : product.image
                        : product.image
                    }
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={6}>
            <Box display="7" flexDirection="column">
              {product.title.includes('USB') &&
              product.hasOwnProperty('information') ? (
                product.information.usb.map(
                  (data: any) => `[${data.quantity}]-${data.name}\n`
                )
              ) : (
                <></>
              )}
              {/* Conditional */}
              {editable ? (
                <>
                  {product.needImages ? (
                    <>
                      {product.title.includes('Bussines') ||
                      product.title.includes('PostCard') ? (
                        <AddInfoBussinesCard product={product} />
                      ) : (
                        <UploadImageByCart product={product} />
                      )}
                    </>
                  ) : product.title.includes('USB') ? (
                    <AddInfoGifts product={product} />
                  ) : (
                    <AddQuantity product={product} />
                  )}
                </>
              ) : (
                <Typography variant="h5">
                  {product.quantity} {product.title}
                  {product.quantity > 1 ? 's' : ''}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>

            {admin &&
            (product.title.includes('Bussines') ||
              product.title.includes('PostCard')) ? (
              <>
                <Button
                  color="secondary"
                  className="circular-btn"
                  onClick={() => downLoadImage(product.information.front)}
                >
                  Front
                </Button>
                {product.information.hasOwnProperty('back') ? (
                  <Button
                    sx={{ marginTop: 1 }}
                    color="secondary"
                    className="circular-btn"
                    onClick={() => downLoadImage(product.information.back)}
                  >
                    Back
                  </Button>
                ) : (
                  <></>
                )}
              </>
            ) : admin ? (
              product.needImages ? (
                <Button
                  color="secondary"
                  className="circular-btn"
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
                    color="secondary"
                    className="circular-btn"
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
                variant="text"
                color="secondary"
                onClick={() => onRemoveCartProduct(product as ICartProduct)}
              >
                Remove
              </Button>
            )}
            {product.needImages && editable === false ? (
              saveOrder ? (
                <Button
                  color="primary"
                  onClick={() =>
                    push(
                      `/orders/gallery/${orderId}?itemId=${product._id}&size=${product.size}`
                    )
                  }
                >
                  View Images
                </Button>
              ) : (
                <UploadImageByCart title="View Images" product={product} />
              )
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
