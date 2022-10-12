import { useContext, PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ShopLayout } from '../../../components/layouts';
import { GetServerSideProps, NextPage } from 'next';
import { IRecover } from '../../../interfaces';
import { Recover } from '../../../models';
import moment from 'moment';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { AuthContext } from '../../../context';

type FormData = {
  tempPassword: string;
  newPassword: string;
  userId: string;
  repeatNewPassword: string;
};

interface Props {
  recover: IRecover;
}

const ChangePassword: NextPage<PropsWithChildren<Props>> = ({ recover }) => {
  const router = useRouter();
  const [checkPassword, setcheckPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      repeatNewPassword: '',
      tempPassword: recover.tempPassword,
      userId: recover.user,
    },
  });

  const { changePassword } = useContext(AuthContext);

  const onResetPassword = (data: FormData) => {
    changePassword(data.newPassword, data.userId);
    router.replace('/auth/login');
  };

  return (
    <ShopLayout
      title="Recover Password"
      pageDescription="confirm address of destination"
    >
      <form onSubmit={handleSubmit(onResetPassword)}>
        <Typography variant="h1" component="h1">
          Recover Password
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="New Password"
              type="password"
              variant="filled"
              fullWidth
              {...register('newPassword', {
                required: true,
                min: 6,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Repeat Password"
              type="password"
              variant="filled"
              fullWidth
              {...register('repeatNewPassword', {
                required: true,
                onChange: ({ target }) => {
                  if (target.value === getValues('newPassword')) {
                    setcheckPassword(true);
                  } else {
                    setcheckPassword(false);
                  }
                },
                min: 6,
              })}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            disabled={!checkPassword}
            color="secondary"
            className="circular-btn"
            size="large"
          >
            {checkPassword
              ? 'Save a new password'
              : 'The 2 passwords must match'}
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '', tempPassword = '' } = query;
  console.log(tempPassword);

  if (!mongoose.isValidObjectId(id)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const recover = await Recover.findById(id);

  if (!recover) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const initialRequestChangePassword: any = moment(recover?.requestedDay);
  const dateNow: any = moment();
  const durationTime = moment
    .duration(dateNow - initialRequestChangePassword)
    .asMinutes();

  if (durationTime > 10) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (!bcryptjs.compareSync(tempPassword?.toString(), recover.tempPassword)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (recover.changePassword) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      recover: JSON.parse(JSON.stringify(recover)),
    },
  };
};

export default ChangePassword;
