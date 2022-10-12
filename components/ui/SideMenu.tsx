import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AdminPanelSettings,
  ApartmentOutlined,
  CardGiftcardOutlined,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  DomainOutlined,
  HomeOutlined,
  InventoryOutlined,
  LoginOutlined,
  PhotoCameraOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';

import { UIContext, AuthContext } from '../../context';

export const SideMenu = () => {
  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      onClose={toggleSideMenu}
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem button onClick={() => navigateTo('/orders/history')}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'My Orders'} />
              </ListItem>
              <ListItem button onClick={() => navigateTo('/perfil/address')}>
                <ListItemIcon>
                  <HomeOutlined />
                </ListItemIcon>
                <ListItemText primary={'My Address'} />
              </ListItem>
            </>
          )}

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/photo')}
          >
            <ListItemIcon>
              <PhotoCameraOutlined />
            </ListItemIcon>
            <ListItemText primary={'Photos'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/gift')}
          >
            <ListItemIcon>
              <CardGiftcardOutlined />
            </ListItemIcon>
            <ListItemText primary={'Gifts'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/press')}
          >
            <ListItemIcon>
              <DomainOutlined />
            </ListItemIcon>
            <ListItemText primary={'Press'} />
          </ListItem>

          {isLoggedIn ? (
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={'Log Out'} />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Login'} />
            </ListItem>
          )}

          {/* Admin */}
          {user?.role === 'admin' && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button onClick={() => navigateTo('/admin')}>
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary={'DashBoard'} />
              </ListItem>
              <ListItem button onClick={() => navigateTo('/admin/products')}>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={'Products'} />
              </ListItem>
              <ListItem button onClick={() => navigateTo('/admin/inventory')}>
                <ListItemIcon>
                  <InventoryOutlined />
                </ListItemIcon>
                <ListItemText primary={'Inventory'} />
              </ListItem>
              <ListItem button onClick={() => navigateTo('/admin/orders')}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Orders'} />
              </ListItem>

              <ListItem button onClick={() => navigateTo('/admin/users')}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={'Users'} />
              </ListItem>
              <ListItem
                button
                onClick={() => navigateTo('/admin/company')}
              >
                <ListItemIcon>
                  <ApartmentOutlined />
                </ListItemIcon>
                <ListItemText primary={'Store Address'} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
