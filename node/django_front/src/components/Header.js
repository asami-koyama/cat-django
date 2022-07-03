import React, { useState, useEffect, useRef } from 'react';
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
import { Header } from '../function/theme'
import { ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {useWindowSize} from 'react-use';
import setGlobalStyle from '../function/GlobalStyle';
import { css } from '@emotion/react';
import AuthService from '../function/AuthService'

const ResponsiveAppBar = () => {

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

  // get header's height
  const elm = useRef(null);
  const { width, height } = useWindowSize();

  const [globalDOM, setGlobalDOM] =  useState();

  useEffect(() => {
    if (elm.current){
      const headerHeight = elm?.current.clientHeight;
      const noHeaderHeight = height - headerHeight;
      const globalStyle = css`
        body{
            min-height: ${noHeaderHeight}px;
        }

        .min-height-fulldisplay{
            min-height: ${noHeaderHeight}px;
        }
      `;
      setGlobalDOM(setGlobalStyle(globalStyle));
    }
    console.log("画面サイズ")
  }, [width, height]);

  const [pages, setPages] = useState([]);
  const [settings, setSettings] =useState([]);

  useEffect(() => {
    AuthService.getCurrentUser().then(result =>{
      console.log(result)

      if (result === 0){
        console.log(0)
        setPages([
          {label: '新規登録', link:'/' },
        ])

        setSettings([
          {label: 'ログイン', link:'/login'},
        ])

      }else if(result.user_type === "Adopter"){
        console.log('Adopter')
        setPages([
          {label: '猫一覧', link:'/cats' },
          {label: '猫登録', link:'/CatCreate' },
          {label: '登録猫一覧', link:'/' }
        ])

        setSettings([
          {label: 'ログアウト', link:'/logout'},
          {label: 'メッセージ', link:'/'},
        ])

      }else if(result.user_type === "Supporter"){
        console.log('Supporter')
        setPages([
          {label: '猫一覧', link:'/cats' },
          {label: '申請中一覧', link:'/' }
        ])

        setSettings([
          {label: 'ログアウト', link:'/logout'},
          {label: 'メッセージ', link:'/'},
        ])
      }


    });
  },[localStorage.getItem("user")])
  




  return (
    <div ref={elm}>
      {globalDOM}
      <ThemeProvider theme={Header}>
        <AppBar position="static">
          <Toolbar disableGutters sx={{mx: 3}}>
            <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              color="secondary"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',          
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  label={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                  color="secondary"
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 ,}}>
              <Button 
              onClick={handleOpenUserMenu} 
              color="secondary"
              sx={{fontFamily: 'monospace',fontWeight: 700 }}>
                    USER
              </Button>
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
                    onClick={handleCloseUserMenu}>
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
