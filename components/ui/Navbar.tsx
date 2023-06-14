import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { CartContext, UIContext } from '../../context';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <>
      <AppBar style={{ backgroundColor: '#F5F5F5 !important'}}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
               <Box
        component="img"
        sx={{
          height: 80,
          width: 103,
          maxHeight: { xs: 80, md: 61 },
          maxWidth: { xs: 103, md: 79 },
        }}
        alt="EL SUENO"
        src="/assets/img/Logo.png"
      />
            </Link>
          </NextLink>

          <Box flex={1} />

          <Box
            sx={{
              display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
            }}
            className="fadeIn"
          >
            <NextLink href="/category/photo" passHref>
              <Link style={{width: '80px'}}>
                <Button
                  color={asPath === '/category/photo' ? 'primary' : 'info'}
                >
                  <Typography fontSize={20}>Photos</Typography>
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/gift" passHref>
              <Link style={{width: '80px'}}>
                <Button
                  color={asPath === '/category/gift' ? 'primary' : 'info'}
                >
                  <Typography fontSize={20}>Gifts</Typography>
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/press" passHref>
              <Link style={{width: '80px'}}>
                <Button
                  color={asPath === '/category/press' ? 'primary' : 'info'}
                >
                  <Typography fontSize={20}>Press</Typography>
                </Button>
              </Link>
            </NextLink>
          </Box>

          <Box flex={1} />

          {isSearchVisible ? (
            <Input
              sx={{ display: { xs: 'none', sm: 'flex', fontSize: 18 } }}
              className="fadeIn"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsSearchVisible(false)}>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              className="fadeIn"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <SearchOutlined />
            </IconButton>
          )}

          <IconButton
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            onClick={toggleSideMenu}
          >
            <SearchOutlined />
          </IconButton>

          <NextLink href="/cart" passHref>
            <Link style={{width: '80px'}}>
              <IconButton>
                <Badge
                  badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
                  color="secondary"
                >
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button onClick={toggleSideMenu} className="menu-button">
            <Typography variant="h6">Menu</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
