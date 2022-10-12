import { FC, PropsWithChildren, useMemo, useState, useContext } from 'react';
import NextLink from 'next/link';

import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
} from '@mui/material';
import { IProduct } from '../../interfaces';
import { AuthContext } from '../../context/auth';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<PropsWithChildren<Props>> = ({ product }) => {
  const [isHovered, setisHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  const rol =
    user?.role === undefined || null
      ? 'client'
      : user?.role === 'admin'
      ? 'federal'
      : user?.role;

  const productImage = useMemo(() => {
    return isHovered
      ? product.images.length === 1
        ? product.images[0]
        : product.images[1]
      : product.images[0];
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={12}
      sm={4}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <Card>
        <NextLink
          href={`/product/${rol}/${product.slug}`}
          passHref
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
    </Grid>
  );
};
