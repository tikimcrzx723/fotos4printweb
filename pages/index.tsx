import { useContext, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';

import {
  Card,
  CardActionArea,
  Grid,
  Link,
  CardMedia,
  Box,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { GridCloseIcon } from '@mui/x-data-grid';
import { AuthContext, UIContext } from '../context';
import { useCartCache } from '../hooks';
import { CartContext } from '../context/cart/CartContext';

const HomePage: NextPage = () => {
  const { freeDelivery, closeDelivery } = useContext(UIContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const { cart, updateCartProductsByCache } = useContext(CartContext);
  const { cartCache } = useCartCache('orders/cart');
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const cartRender = useMemo(() => {
    return cart.length === 0 ? cartCache : cart;
  }, [cart, cartCache]);

  useEffect(() => {
    updateCartProductsByCache(cartRender as any);
  }, []);

  return (
    <>
      {freeDelivery && isLoggedIn ? (
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ background: '#ffff0080', marginTop: 7.5 }}
        >
          <Typography color="primary"></Typography>
          <Typography color="#00000090" variant="h6" sx={{ fontWeight: 500 }}>
            Add $100.00 to your order to receive FREE SHIPPING! (Only OR, WA)
          </Typography>
          <IconButton
            onClick={closeDelivery}
            aria-label="close"
            color="primary"
            size="small"
          >
            <GridCloseIcon fontSize="medium" sx={{ fontWeight: 500 }} />
          </IconButton>
        </Box>
      ) : (
        <></>
      )}
      <ShopLayout
        title={'Foto Studio El Sueno - Home'}
        pageDescription={
          'Print all your memories and photos with the best quality.'
        }
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4} >
            <Card style={{borderRadius: "6px", textAlign: '-webkit-center', padding: '2rem', background: 'linear-gradient(90deg, rgba(219,219,219,1) 0%, rgba(242,242,242,1) 35%, rgba(255,255,255,1) 100%)'}}>
              <NextLink href={'/category/photo'} passHref prefetch={false}>
                <Link>
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      style={{ width: '70%'}}
                      image={'/assets/img/folder-img.png'}
                      alt="anime"
                      className="fadeIn"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div" align='center' style={{marginTop: '2rem'}}>
                        Photo Printing
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  
                </Link>
              </NextLink>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={{borderRadius: "6px", textAlign: '-webkit-center', padding: '2rem', background: 'linear-gradient(90deg, rgba(219,219,219,1) 0%, rgba(242,242,242,1) 35%, rgba(255,255,255,1) 100%)'}}>
              <NextLink href={'/category/gift'} passHref prefetch={false}>
                <Link>
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      style={{ width: '70%'}}
                      image={'/assets/img/gift-img.png'}
                      alt="anime"
                      className="fadeIn"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div" align='center' style={{marginTop: '2rem'}}>
                        Gifts Printing
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </NextLink>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={{borderRadius: "6px", textAlign: '-webkit-center', padding: '2rem', background: 'linear-gradient(90deg, rgba(219,219,219,1) 0%, rgba(242,242,242,1) 35%, rgba(255,255,255,1) 100%)'}}>
              <NextLink href={'/category/press'} passHref prefetch={false} >
                <Link>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      style={{ width: '68%'}}
                      image={'/assets/img/press-img.png'}
                      alt="anime"
                      className="fadeIn"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" align='center'>
                        <span style={{color:'#028ED6'}}>C</span>
                        <span style={{color:'#E70F8F'}}>M</span>
                        <span style={{color:'#F5EA02'}}>Y</span>
                        <span style={{color:'#000000'}}>C</span>
                        <span style={{color:'#000000'}}> + </span>
                        <span style={{color:'#00000030'}}>WW</span>
                      </Typography> 
                      <Typography gutterBottom variant="h4" component="div" align='center' >
                        Press Printing
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </NextLink>
            </Card>
          </Grid>
        </Grid>
      </ShopLayout>
    </>
  );
};

export default HomePage;
