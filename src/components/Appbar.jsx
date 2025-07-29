import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { borderRadius } from '@mui/system';
import { Link } from 'react-router-dom'

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1, margin: "10px" }}>
            <AppBar position="static" sx={{ backgroundColor: '#ffaaa5', borderRadius: "10px" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="LocalFlorist"
                        sx={{ mr: 2 }}
                    >
                        <LocalFloristIcon />
                    </IconButton>
                    <Link className='link'
                        to="/"
                        sx={{ mr: 8 }}
                    >
                        Ana Menü
                    </Link>
                    {/*<Link className='link'
                        to="/catalog"
                        sx={{ mr: 8 }}
                    >
                        Sipariş Kataloğumuz
    </Link>*/}
                    <Link className='link'
                        to="/communucation"
                        sx={{ mr: 8 }}
                    >
                        İletişim 💌
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}