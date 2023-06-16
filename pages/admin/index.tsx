import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  InventoryOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {
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
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
  } = data!;

  return (
    <>
      <AdminLayout
        title="Dashboard"
        subTitle="General statistics"
        icon={<DashboardOutlined />}
      >
        <Grid container spacing={3} >
          <SummaryTile
            title={ numberOfOrders}
            subTitle="Total Orders"
            icon={
              <CreditCardOutlined color="secondary" sx={{ fontSize: 60 }} />
            }
            text={
              <a href={`/admin/orders/all`} target="_blank" rel="noreferrer" className='card-link'>
                <Typography variant="body1">Total Orders</Typography>
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
            title={numberOfClients}
            subTitle="Clients"
            icon={<GroupOutlined color="primary" sx={{ fontSize: 60 }} />}
            text={
              <a href={`/admin/users`} target="_blank" rel="noreferrer" className='card-link'>
                <Typography variant="body1">Clients</Typography>
              </a>
            }
          />
          <SummaryTile
            title={numberOfProducts}
            subTitle="Products"
            icon={<CategoryOutlined color="warning" sx={{ fontSize: 60 }} />}
            text={
              <a href={`/admin/products`} target="_blank" rel="noreferrer" className='card-link'>
                <Typography variant="body1">Products</Typography>
              </a>
            }
          />
          <SummaryTile
            title={productsWithNoInventory}
            subTitle="No Existence"
            icon={
              <CancelPresentationOutlined color="error" sx={{ fontSize: 60 }} />
            }
            text={<Typography variant="body1" className='card-link'>No Existence</Typography>}
          />
          <SummaryTile
            title={lowInventory}
            subTitle="Low Inventory"
            icon={
              <ProductionQuantityLimitsOutlined
                color="warning"
                sx={{ fontSize: 60 }}
              />
            }
            text={<Typography variant="body1" className='card-link'>Low Inventory</Typography>}
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

export default DashboardPage;
