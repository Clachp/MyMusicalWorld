import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu, toggleProfileModal } from 'src/actions/header';
import { openLoginModal } from 'src/actions/login';
import { openSignUpModal } from 'src/actions/signup';
import { userLogout } from 'src/actions/user';

import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import AlbumIcon from '@mui/icons-material/Album';
import InfoIcon from '@mui/icons-material/Info';
import CopyrightIcon from '@mui/icons-material/Copyright';

import './style.scss';

const MobileMenu = () => {
  const opened = useSelector((state) => state.header.mobileMenuOpened);
  const { isLogged, pseudo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    const action = toggleMobileMenu();
    dispatch(action);
  };

  const handleOpenLoginModal = () => {
    const action = openLoginModal();
    dispatch(action);
  };

  const handleOpenSignupModal = () => {
    const action = openSignUpModal();
    dispatch(action);
  };

  const handleLogout = () => {
    const action = userLogout();
    dispatch(action);
  };

  const handleOpenProfileModal = () => {
    const action = toggleProfileModal();
    dispatch(action);
  };

  const list = () => (
    <Box
      role="presentation"
      sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
    >
      {!isLogged ? (
        <List>
          <ListItem sx={{ padding: 0 }}>
            <button type="button" onClick={handleOpenLoginModal} className="mobile-menu__link">
              <span>Se connecter</span>
              <ArrowForwardIosIcon sx={{ ml: 'auto' }} fontSize="small" />
            </button>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <button type="button" onClick={handleOpenSignupModal} className="mobile-menu__link">
              <span>S'inscrire</span>
              <ArrowForwardIosIcon sx={{ ml: 'auto' }} fontSize="small" />
            </button>
          </ListItem>
        </List>
      ) : (
        <>
          <button className="mobile-menu__link" onClick={handleOpenProfileModal} type="button">
            <AccountCircleIcon sx={{ mr: '10px' }} />
            <span>Mon profil</span>
            <ArrowForwardIosIcon sx={{ ml: 'auto' }} fontSize="small" />
          </button>
          <NavLink className={({ isActive }) => (isActive ? 'mobile-menu__link mobile-menu__link--active' : 'mobile-menu__link')} to="/dashboard" onClick={handleMenuToggle}>
            <AlbumIcon sx={{ mr: '10px' }} />
            <span>Ma bibliothèque</span>
            <ArrowForwardIosIcon sx={{ ml: 'auto' }} fontSize="small" />
          </NavLink>
          <button className="mobile-menu__link" onClick={handleLogout} type="button">
            <LogoutIcon sx={{ mr: '10px' }} fontSize="medium" />
            <span>Se déconnecter</span>
            <ArrowForwardIosIcon sx={{ ml: 'auto' }} fontSize="small" />
          </button>
        </>
      )}
      <Box sx={{ mt: 'auto' }}>
        <NavLink className={({ isActive }) => (isActive ? 'mobile-menu__link mobile-menu__link--active' : 'mobile-menu__link')} to="/about" onClick={handleMenuToggle}>
          <InfoIcon sx={{ mr: '10px' }} fontSize="medium" />
          <span>A propos</span>
          <ArrowForwardIosIcon sx={{ ml: 'auto' }} fontSize="small" />
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'mobile-menu__link mobile-menu__link--active' : 'mobile-menu__link')} to="/legal" onClick={handleMenuToggle}>
          <CopyrightIcon sx={{ mr: '10px' }} fontSize="medium" />
          <span>Mentions légales </span>
          <ArrowForwardIosIcon sx={{ ml: 'auto' }} fontSize="small" />
        </NavLink>
      </Box>
    </Box>
  );

  return (
    <nav className="mobile-menu">
      <Button
        onClick={handleMenuToggle}
        sx={{ color: '#ffffff', padding: 0 }}
      >
        <MenuIcon />
      </Button>
      <Drawer
        className="hidden-desktop"
        sx={{
          width: '70vw',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '70vw', maxWidth: '320px', boxSizing: 'border-box', flexGrow: 1,
          },
        }}
        anchor="right"
        open={opened}
        onClose={handleMenuToggle}
      >
        <IconButton onClick={handleMenuToggle} sx={{ mb: 2 }}>
          <CloseIcon />
        </IconButton>
        {isLogged && <h2 className="mobile_menu__title">Bonjour {pseudo}</h2> }
        {list()}
      </Drawer>
    </nav>
  );
};

export default MobileMenu;
