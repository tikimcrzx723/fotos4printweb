import { FC, PropsWithChildren, useMemo, useState } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { IProduct } from '../../interfaces';
import { useRole } from '../../hooks';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<PropsWithChildren<Props>> = ({ product }) => {
  const [isHovered, setisHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { role } = useRole('user/rol');
  const rol = role.message === 'admin' ? 'federal' : role.message;

  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0];
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

      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography textAlign="center" fontWeight={700} variant="h6">
          {product.title}
        </Typography>
      </Box>
    </Grid>
  );
};
