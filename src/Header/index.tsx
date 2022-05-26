import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Logo from 'Assets/skippet-logo.png'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='transparent' position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2}}
          >
            <img style={{height: '40px' }} src={Logo} alt="skippet-logo" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}