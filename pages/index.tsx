import type { NextPage } from 'next';
import NextLink from 'next/link';

import { Card, CardActionArea, Grid, Link, CardMedia } from '@mui/material';
import { ShopLayout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Fotos4Print - Home'}
      pageDescription={
        'Print all your memories and photos with the best quality.'
      }
    >
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <Card>
            <NextLink href={'/category/photo'} passHref prefetch={false}>
              <Link>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={'/a.jpg'}
                    alt="anime"
                    className="fadeIn"
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <NextLink href={'/category/gift'} passHref prefetch={false}>
              <Link>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="/b.jpg"
                    alt="anime"
                    className="fadeIn"
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <NextLink href={'/category/press'} passHref prefetch={false}>
              <Link>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="/c.jpg"
                    alt="anime"
                    className="fadeIn"
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HomePage;
