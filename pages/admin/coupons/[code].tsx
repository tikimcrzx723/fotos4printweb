import { PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ShopLayout } from '../../../components/layouts';
import { GetServerSideProps, NextPage } from 'next';
import { ICuponCode } from '../../../interfaces';
import { CuponCode } from '../../../models';
import { appApi } from '../../../api';

type FormData = {
  _id?: string;
  code: string;
  numCupons: number;
  minimumPurchase: number;
  discount: number;
};

interface Props {
  coupon: ICuponCode;
}

const AddressPage: NextPage<PropsWithChildren<Props>> = ({ coupon }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: coupon,
  });

  const onSubmitCoupon = async (form: FormData) => {
    setIsSaving(true);
    try {
      await appApi({
        url: '/admin/coupons',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });
      if (!form._id) {
        router.replace(`/admin/coupons/${form.code}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <ShopLayout
      title="Coupons"
      pageDescription="Create Coupons"
    >
      <form onSubmit={handleSubmit(onSubmitCoupon)}>
        <Typography variant="h1" component="h1" alignContent="center">
          Coupon Code
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Coupon Code"
              variant="filled"
              fullWidth
              {...register('code', {
                required: 'This field is required',
              })}
              error={!!errors.code}
              helperText={errors.code?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Coupon Numbers"
              variant="filled"
              fullWidth
              {...register('numCupons', {
                required: 'This field is required',
              })}
              error={!!errors.numCupons}
              helperText={errors.numCupons?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Minimum Purchase"
              variant="filled"
              fullWidth
              {...register('minimumPurchase', {
                required: 'This field is required',
              })}
              error={!!errors.minimumPurchase}
              helperText={errors.minimumPurchase?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Discount"
              variant="filled"
              fullWidth
              {...register('discount')}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
            disabled={isSaving}
          >
            {coupon ? 'Save ' : 'Update '}Coupon Code
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { code } = query;

  let couponCode: ICuponCode | null;

  if (code === 'new') {
    const tempCouponCode = JSON.parse(JSON.stringify(new CuponCode()));
    delete tempCouponCode._id;
    couponCode = tempCouponCode;
  } else {
    couponCode = JSON.parse(JSON.stringify(await CuponCode.findOne({ code })));
  }

  if (!couponCode) {
    return {
      redirect: {
        destination: '/admin/coupons',
        permanent: false,
      },
    };
  }

  return {
    props: {
      coupon: couponCode,
    },
  };
};

export default AddressPage;
