import { useContext, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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

let auxPhoneNumber = '';

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
    if (data.phone.length < 10) {
      alert ('Phone number need 10 digits')
    } else {
      if (address === null) addAdress(data);
      else updateAddress(data);
      router.replace('/');
    }
  };

  return (
    <ShopLayout
      title="Address"
      pageDescription="confirm address of destination"
    >
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1" alignContent="center">
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                defaultValue={getValues('state') ? getValues('state') : 'OR'}
                label="State"
                onChange={({ target }) => {
                  setValue('state', target.value as any, {
                    shouldValidate: true,
                  });
                }}
                variant="filled"
              >
                {validStates.map(({ code, state }) => (
                  <MenuItem key={code} value={code}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              type="tel"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'This field is required',
                min: 10,
                onChange: (e) => {
                  if (e.nativeEvent.data !== ' ') {
                    const valueLetter = e.target.value.substring(
                      e.target.value.length - 1,
                      e.target.value.length
                    );
                    if (
                      auxPhoneNumber.length < 10 ||
                      e.nativeEvent.data === null
                    ) {
                      if (Number(valueLetter) >= 0) {
                        auxPhoneNumber += valueLetter;
                      }
                      if (e.nativeEvent.data === null) {
                        auxPhoneNumber = auxPhoneNumber.substring(
                          0,
                          auxPhoneNumber.length - 2
                        );
                      }
                    }
                  }
                  setValue('phone', auxPhoneNumber, { shouldValidate: true });
                },
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
  let address: IAddress = await dbUsers.findAddress(session.user._id);

  return {
    props: {
      address,
    },
  };
};

export default AddressPage;
