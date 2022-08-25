import { PropsWithChildren } from 'react';
import { NextPage } from 'next';

import { AuthLayout } from '../../../components/layouts';

import { Typography } from '@mui/material';

interface Props {}

const ActiveUser: NextPage<PropsWithChildren<Props>> = () => {
  return (
    <AuthLayout title="Active">
      <Typography variant="h1" component="h1">
        Active
      </Typography>
    </AuthLayout>
  );
};

export default ActiveUser;
