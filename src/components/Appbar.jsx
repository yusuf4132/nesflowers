import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAdminClick = () => {
    handleMenuClose();
    navigate('/admin-login');
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '10px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffaaa5', borderRadius: '10px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton size="large" edge="start" color="inherit" aria-label="LocalFlorist" sx={{ mr: 2 }}>
              <LocalFloristIcon />
            </IconButton>

            <Link className="link" to="/" style={{ color: 'white', textDecoration: 'none', marginRight: 20 }}>
              Ana Menü
            </Link>
            <Link className="link" to="/communucation" style={{ color: 'white', textDecoration: 'none' }}>
              İletişim 💌
            </Link>
          </Box>

          {/* Sağ üstte menü butonu */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleAdminClick}>Admin Giriş</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
