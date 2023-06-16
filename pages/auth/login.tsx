import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { ErrorOutline, FacebookOutlined } from '@mui/icons-material';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        
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
              <Typography variant="h2" component="h2" align='center'>
                Sign in
              </Typography>
              <Chip
                label="We do not recognize this user / password"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
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
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                  minLength: { value: 6, message: '6 characters minimum' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
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
                Sign In
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p?.toString()}`
                    : '/auth/register'
                }
                passHref
              >
                <Link
                  sx={{ marginLeft: 1 }}
                  underline="always"
                  color="secondary"
                >
                  Create an account
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography>Forgot your</Typography>
              <NextLink href="/auth/forgot" passHref>
                <Link
                  sx={{ marginLeft: 1 }}
                  underline="always"
                  color="secondary"
                >
                  password?
                </Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end"
            >
              <Divider sx={{ width: '100%', mb: 2 }} />
              {Object.values(providers).map((provider: any) => {
                if (provider.id === 'credentials')
                  return <div key="credentials"></div>;

                return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    fullWidth
                    className={ provider.name == 'Google' ? 'google-button' : 'facebook-button'}
                    color="primary"
                    sx={{ mb: 1 }}
                    onClick={() => signIn(provider.id)}
                  >
                    <span className='left-icon'>
                    {provider.name == 'Google' ? 
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 48 48" ><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                    : <FacebookOutlined fontSize='large' />}
                    
                    </span>
                    <span style={{}}>
                      
                    {provider.name}
                    </span>
                  </Button>
                );
              })}
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

export default LoginPage;
