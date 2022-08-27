import { useContext, useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { ShopLayout } from '../../../components/layouts';
import { CartContext } from '../../../context';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbUsers } from '../../../database';
import { IAddress } from '../../../interfaces';
import { appApi } from '../../../api';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  state: string;
  phone: string;
};

interface Props {
  address: IAddress;
}

const validStates = [
  { code: 'OR', state: 'Oregon' },
  { code: 'WA', state: 'Washington' },
];

const AddressPage: NextPage<PropsWithChildren<Props>> = ({ address }) => {
  const router = useRouter();
  const { updateAddress, addAdress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: address,
  });

  const onSubmitAddress = (data: FormData) => {
    if (address === null) addAdress(data);
    else updateAddress(data);
    router.reload();
  };

  return (
    <ShopLayout
      title="Address"
      pageDescription="confirm address of destination"
    >
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1">
          Address
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'This field is required',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'This field is required',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
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

          {/* <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="State"
              fullWidth
              {...register('state', {
                required: 'This field is required',
              })}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth> */}
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                State
              </InputLabel>
              <NativeSelect
                onChange={({ target }) => {
                  setValue('state', target.value, { shouldValidate: true });
                }}
                defaultValue='OR'
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                {validStates.map(({ code, state }) => (
                  <option key={code} value={code}>
                    {state}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
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
            {address ? 'Update ' : 'Save '}Address
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });
  const address: IAddress | null = await dbUsers.findAddress(session.user._id);

  return {
    props: {
      address,
    },
  };
};

export default AddressPage;
