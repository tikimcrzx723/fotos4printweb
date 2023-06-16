import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { appApi } from '../../api';

type FormData = {
  email: string;
};

const ForgotPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onForgotPassword = async ({ email }: FormData) => {
    const { data } = await appApi.post('/user/password/recover', { email });
    console.log(data);

    if (data.message === 'User not found!') {
      return alert("Email doesn't exist");
    }
    alert('Please check your eamil ' + email);
    router.replace('/');
  };

  return (
    <AuthLayout title="Forgot Password">
      <form onSubmit={handleSubmit(onForgotPassword)} noValidate>
      <Box sx={{ width: 450, padding: '20px 50px',  backgroundColor: '#FFFFFF' }}>
          <Box textAlign={'center'}>
            <Box className='auth-image'
                component="img"
                sx={{
                  height: 122,
                  width: 158,
                  maxHeight: { xs: 122, md: 160 },
                  maxWidth: { xs: 158, md: 206 },
                }}
                alt="EL SUENO"
                src="/assets/img/Logo.png"
              />
            </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" align='center'>
                Recover Account
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="mail"
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Recover
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p?.toString()}`
                    : '/auth/login'
                }
                passHref
              >
                <Link underline='always'>Back to login</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ForgotPage;
