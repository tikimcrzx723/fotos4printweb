import { FC, PropsWithChildren } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { LocalSeeOutlined, PhotoCameraOutlined } from '@mui/icons-material';

interface Props {
  url: string;
  image: string;
  category: string;
}

export const CategoryIndex: FC<PropsWithChildren<Props>> = ({
  url,
  image,
  category,
}) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Card>
          <NextLink href={url} passHref prefetch={false}>
            <Link>
              <CardActionArea>
                <PhotoCameraOutlined sx={{ fontSize: 250 }} />
              </CardActionArea>
            </Link>
          </NextLink>
        </Card>

        <Box sx={{ mt: 1 }} className="fadeIn">
          <Typography textAlign="center" fontWeight={700} variant="h6">
            {category}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};
