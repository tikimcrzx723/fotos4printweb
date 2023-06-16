import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  InventoryOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { DashboardSummaryResponse } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import { SummaryTile } from '../../../components/admin';

const DashboardInventory = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000,
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error loading information</Typography>;
  }

  const {
    numberOfOrders,
    completedOrders,
    paidOrders,
    notPaidOrders,
    userOrders,
  } = data!;

  return (
    <>
      <AdminLayout
        title="Dashboard"
        subTitle="Inventory"
        icon={<DashboardOutlined />}
      >
        <Grid container spacing={3}>
          <SummaryTile
            title={numberOfOrders}
            subTitle="Total Orders"
            icon={
              <CreditCardOutlined color="secondary" sx={{ fontSize: 60 }} />
            }
            text={
              <a href={`/admin/orders/all`} target="_blank" rel="noreferrer" className='card-link'>
                <Typography variant="body1" >Total Orders</Typography>
              </a>
            }
          />

          <SummaryTile
            title={completedOrders}
            subTitle="Completed Orders"
            icon={<InventoryOutlined color="success" sx={{ fontSize: 60 }} />}
            text={
              <a
                href={`/admin/orders/completed`}
                target="_blank"
                rel="noreferrer"
                className='card-link'
              >
                <Typography variant="body1">Completed Orders</Typography>
              </a>
            }
          />

          <SummaryTile
            title={paidOrders}
            subTitle="Paid Orders"
            icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 60 }} />}
            text={
              <a href={`/admin/orders/paid`} target="_blank" rel="noreferrer" className='card-link'>
                <Typography variant="body1">Paid Orders</Typography>
              </a>
            }
          />

          <SummaryTile
            title={notPaidOrders}
            subTitle="No Paid Orders"
            icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 60 }} />}
            text={
              <a
                href={`/admin/orders/notpaid`}
                target="_blank"
                rel="noreferrer"
                className='card-link'
              >
                <Typography variant="body1">No Paid Orders</Typography>
              </a>
            }
          />

          <SummaryTile
            title={userOrders}
            subTitle="Clients Orders"
            icon={<GroupOutlined color="primary" sx={{ fontSize: 60 }} />}
            text={
              <a href={`/admin/users`} target="_blank" rel="noreferrer" className='card-link'>
                <Typography variant="body1" >Clients Orders</Typography>
              </a>
            }
          />
          <SummaryTile
            title={refreshIn}
            subTitle="Updating in:"
            icon={
              <AccessTimeOutlined color="secondary" sx={{ fontSize: 60 }} />
            }
            text={<Typography variant="body1" className='card-link'>RefreshIn</Typography>}
          />
        </Grid>
      </AdminLayout>
    </>
  );
};

export default DashboardInventory;
