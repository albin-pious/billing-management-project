import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Typography variant="h6">Billing Dashboard</Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
