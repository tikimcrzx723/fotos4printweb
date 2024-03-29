import { useContext, useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CartContext } from '../../../context/cart/CartContext';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../../components/products';
import { ICartProduct, IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const [priceChange, setPrice] = useState(product.price[0].priceFerderal);
  const [added, setAdded] = useState(
    product.price[0].hasOwnProperty('added')
      ? product.price[0].added!.map(({ complement, federal }) => {
          return { complement, increment: federal };
        })
      : [{ complement: 'none', increment: 0 }]
  );
  const { addProductToCart } = useContext(CartContext);
  const sizes: any = product.price.map((detail) => {
    return detail.size;
  });

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    type: product.type!,
    price: priceChange,
    size: product.price[0].size,
    slug: product.slug,
    title: product.title,
    needImages: product.needImages,
    minIMages: product.minIMages,
    quantity: product.needImages
      ? 0
      : product.title.toLowerCase().includes('event')
      ? 50
      : 1,
    added: added,
    priceBase: priceChange,
    information: [],
  });

  const onSelectedSize = async (size: string) => {
    const auxProduct = product.price.find((p) => p.size === size);
    const price = auxProduct?.priceFerderal;
    const auxAdded = auxProduct?.hasOwnProperty('added')
      ? auxProduct.added!.map(({ complement, federal }) => {
          return { complement, increment: federal };
        })
      : [{ complement: 'none', increment: 0 }];

    setPrice(price!);
    setAdded(auxAdded!);

    tempCartProduct.price = priceChange;
    tempCartProduct.priceBase = price;
    tempCartProduct.added = auxAdded;
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    tempCartProduct.price = priceChange;
    tempCartProduct.userImages = [];

    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* title */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${priceChange}
            </Typography>

            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="h5" fontWeight={700}>
                {product.title.toLowerCase().includes('even') ||
                product.title.toLowerCase().includes('flyer') ||
                product.title.toLowerCase().includes('card')
                  ? 'Quantity'
                  : product.needImages === false
                  ? ''
                  : 'Size'}
              </Typography>
              <SizeSelector
                sizes={sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {/* AddCart */}
            {product.price.length > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempCartProduct.size ? 'Add to cart' : 'Select Option'}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}
            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const products = await dbProducts.getAllProductSlugs();

  return {
    paths: products.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

export default ProductPage;
