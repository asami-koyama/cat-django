import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PetsIcon from '@mui/icons-material/Pets';
import { Header } from '../function/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useWindowSize } from 'react-use';
import setGlobalStyle from '../function/GlobalStyle';
import { css } from '@emotion/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { unreadMessageState } from '../function/Atom';
import { userDataState } from '../function/Atom';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const ResponsiveAppBar = () => {
  const status = useRecoilValue(userDataState);
  const [unread, setUnread] = useRecoilState(unreadMessageState);

  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState([]);
  const [message, setMessage] = useState('');

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ヘッダー分の高さを取得してGlobalCSSを生成
  const elm = useRef(null);
  const { width, height } = useWindowSize();

  const [globalDOM, setGlobalDOM] = useState();

  useEffect(() => {
    if (elm.current) {
      const headerHeight = elm?.current.clientHeight;
      const noHeaderHeight = height - headerHeight;
      const globalStyle = css`
        body {
          min-height: ${noHeaderHeight}px;
        }

        .min-height-fulldisplay {
          min-height: ${noHeaderHeight}px;
        }

        .min-height-fulldisplay-minus1 {
          min-height: calc(${noHeaderHeight}px - 1vh);
        }
      `;
      setGlobalDOM(setGlobalStyle(globalStyle));
    }
  }, [width, height]);

  // ヘッダーの項目を決定
  useEffect(() => {
    if (status.user_type == '') {
      setPages([{ label: '', link: '/' }]);

      setSettings([{ label: 'ログイン', link: '/login' }]);
    } else {
      const user_type = status.user_type == 'Adopter' ? 'adopter' : 'supporter';
      axios
        .get(
          'http://192.168.150.201:8000/api/chats/?' +
            user_type +
            '=' +
            status.id +
            '&sender=' +
            status.id
        )
        .then((res) => {
          console.log(res.data.length);
          setUnread(res.data.length);
          setMessage(
            <Link to="/chatTable">
              <IconButton size="large" color="secondary">
                <Badge badgeContent={res.data.length} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Link>
          );
        });

      setSettings([{ label: 'ログアウト', link: '/logout' }]);
      if (status.user_type == 'Supporter') {
        setPages([
          { label: '猫一覧', link: '/cats' },
          { label: '猫登録', link: '/CatCreate' },
          { label: '登録猫一覧', link: '/catsTableRegistered' },
          { label: '申請一覧', link: '/OfferTable' },
        ]);
      } else if (status.user_type == 'Adopter') {
        setPages([
          { label: '猫一覧', link: '/cats' },
          { label: '申請中一覧', link: '/offerCats' },
        ]);
      }
    }
  }, [status.user_type]);

  // ロケーション毎にheaderのcssを変更
  const location = useLocation();
  let headerClearStyle;
  let headerTextColor;

  if (location.pathname == '/') {
    headerClearStyle = css`
      background-color: transparent;
      position: fixed;
      z-index: 50000;
      box-shadow: none;
    `;

    headerTextColor = css`
      color: rgb(141, 134, 110);
    `;
  } else {
    headerClearStyle = css``;
    headerTextColor = ``;
  }

  return (
    <div ref={elm}>
      {globalDOM}
      <ThemeProvider theme={Header}>
        <AppBar position="static" css={headerClearStyle}>
          <Toolbar disableGutters sx={{ mx: 3 }}>
            <PetsIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              css={headerTextColor}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              color="secondary"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: '24px',
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              CatWith
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    label={page.label}
                    component={Link}
                    to={page.link}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <PetsIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              css={headerTextColor}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              color="secondary"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              CatWith
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  label={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: 'block',
                    fontWeight: 'bold',
                  }}
                  color="secondary"
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {message}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="secondary"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    label={setting.label}
                    component={Link}
                    to={setting.link}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};
export default ResponsiveAppBar;
