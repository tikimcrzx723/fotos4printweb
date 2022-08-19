import { useContext, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ShopLayout } from '../../../components/layouts';
import { AuthContext } from '../../../context';
import { GetServerSideProps, NextPage } from 'next';
import { ICompany } from '../../../interfaces';
import { dbUsers } from '../../../database';

type FormData = {
  name: string;
  deliveryPrice: number;
  minFreeDelivery: number;
  address: string;
  address2: string;
  zip: string;
  city: string;
  state: string;
  phone: string;
};

interface Props {
  company: ICompany;
}

const AddressPage: NextPage<PropsWithChildren<Props>> = ({ company }) => {
  const router = useRouter();
  const { createCompany } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: company,
  });

  const onSubmitAddress = (data: FormData) => {
    createCompany(data);
    router.reload();
  };

  return (
    <ShopLayout title="Company Name" pageDescription="Company Name">
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1">
          Company Name
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register('name', {
                required: 'This field is required',
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Delivery Price"
              variant="filled"
              type="number"
              fullWidth
              {...register('deliveryPrice', {
                required: 'This field is required',
              })}
              error={!!errors.deliveryPrice}
              helperText={errors.deliveryPrice?.message}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Min Delivery Price"
              variant="filled"
              type="number"
              fullWidth
              {...register('minFreeDelivery', {
                required: 'This field is required',
              })}
              error={!!errors.minFreeDelivery}
              helperText={errors.minFreeDelivery?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'This field is required',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2 (optional)"
              variant="filled"
              fullWidth
              {...register('address2')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'This field is required',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'This field is required',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth> */}
            <TextField
              // select
              variant="filled"
              label="State"
              fullWidth
              // defaultValue={ Cookies.get('country') || countries[0].code }
              {...register('state', {
                required: 'This field is required',
              })}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'This field is required',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            {company ? 'Update ' : 'Save '}Company
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const company: ICompany | null = await dbUsers.findCompany();

  return {
    props: {
      company,
    },
  };
};

export default AddressPage;
