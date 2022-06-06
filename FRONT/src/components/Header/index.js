import './style.scss';
import logo from 'src/assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { openLoginModal } from 'src/actions/login';
import { openSignUpModal } from 'src/actions/signup';
import { toggleProfileModal } from 'src/actions/header';

import { Link, NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import {
  AppBar, Avatar, Button, Container, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import AlbumIcon from '@mui/icons-material/Album';
import styles from '../../styles/_exports.module.scss';
import ProfileModal from './ProfileModal';
import MobileMenu from './MobileMenu';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { userLogout } from '../../actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const { isLogged, pseudo } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserLogout = () => {
    const action = userLogout();
    dispatch(action);
  };

  const handleOpenLoginModal = () => {
    const action = openLoginModal();
    dispatch(action);
  };

  const handleOpenSignUpModal = () => {
    const action = openSignUpModal();
    dispatch(action);
  };
  const handleOpenProfileModal = () => {
    const action = toggleProfileModal();
    dispatch(action);
  };
  return (
    <AppBar className="header" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h1"
            noWrap
            component="h1"
            sx={{ mr: 2, display: 'flex', fontSize: '1.8rem' }}
          >
            <Link className="header__brand" to="/">My Musical World</Link>
          </Typography>
          {!isLogged ? (
            <Box sx={{ ml: 'auto' }}>
              <div className="hidden-mobile">
                <Button
                  className="button-green"
                  onClick={handleOpenLoginModal}
                  sx={{ mr: '10px' }}
                >
                  Se connecter
                </Button>
                <Button
                  className="button-green"
                  onClick={handleOpenSignUpModal}
                >
                  S'inscrire
                </Button>
              </div>
              <LoginModal />
              <SignUpModal />
            </Box>
          ) : (
            <>
              <Box className="hidden-mobile" sx={{ ml: 'auto' }}>
                <Tooltip title="Menu utilisateur">
                  <IconButton
                    onClick={handleUserMenuClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{
                      width: 32, height: 32, backgroundColor: '#ffffff', color: styles['dark-grey'],
                    }}
                    >{pseudo.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleUserMenuClose}
                onClick={handleUserMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleOpenProfileModal}>
                  <Avatar /> Mon profil
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <AlbumIcon />
                  </ListItemIcon>
                  <NavLink className={({ isActive }) => (isActive ? 'header__link header__link--active' : 'header__link')} to="/dashboard">Ma bibliothèque</NavLink>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleUserLogout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Déconnexion
                </MenuItem>
              </Menu>
              <ProfileModal />
            </>
          )}
          <MobileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
