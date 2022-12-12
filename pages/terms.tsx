import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

const TermsPage: NextPage = () => {
  return (
    <ShopLayout
      title={'Fotos4Print - Home'}
      pageDescription={'Fotos4Print Terms and Conditions'}
    >
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Typography component='h1' style={{ fontSize: 32, marginBottom: 12 }}>
            Terms of Use
          </Typography>
          <Typography component='body'>
            By using fotos4print, you agree to the following Terms of Use.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} sx={{ marginTop: 8 }}>
          <Typography component='h1' style={{ fontSize: 32, marginBottom: 12 }}>
            Ownership of uploaded images
          </Typography>
          <Typography component='body'>
            fotos4print agrees that you retain the rights to your image.
            Therefore it is your responsibility to edit or remove them,
            fotos4print will only print your images on the products you select.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} sx={{ marginTop: 8 }}>
          <Typography component='h1' style={{ fontSize: 32, marginBottom: 12 }}>
            Deletion of Images
          </Typography>
          <Typography component='body'>
            fotos4print reserves the right to delete any images that you upload
            if fotos4print determines that your images are inappropriate for any
            reason, scenarios may include copyrighted or pornographic images.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} sx={{ marginTop: 8 }}>
          <Typography component='h1' style={{ fontSize: 32, marginBottom: 12 }}>
            Order cancellation
          </Typography>
          <Typography component='body'>w...</Typography>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default TermsPage;
