import  React,{useState, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import authContext from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartIconWithCounter from '../CartProducts/CartIconWithCounter';
import Menus from '../Menus/Menus';

const Navbar=()=>{
  
  const {authenticated, setAuthenticated} = useContext(authContext);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Box component="main"
    sx={{
      flexGrow: 1,
      marginLeft: showSidebar ? '250px' : '0',
      transition: 'margin-left 0.3s ease',
    }}>
      <AppBar width="100vw" color='transparent' style={{backgroundColor:'white', height:'60px', zIndex: showSidebar ? 10 : 1100}} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', "&:hover": { color: "blue"} }}}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>BWI</Link>
          </Typography>
          {authenticated ?
          <div style={{display:"flex"}}>
            <Link to="/cart" style={{ textDecoration: 'none', "&:hover": { color: "blue"}}}>
              <CartIconWithCounter/>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  setAuthenticated(false);
                }}
                sx={{ my: 2, color: "black", display: "block", "&:hover": { color: "blue"}, alignSelf:'flex-end'}}
            >
                Logout
            </Button>
            </Link>
          </div>
          :
          <div style={{display:"flex"}}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
                onClick={() => {}}
                sx={{ my: 2, color: "black", display: "block", "&:hover": { color: "blue"}}}
            >
                Login
            </Button>
            </Link>
          </div>
          }
        </Toolbar>
      </AppBar>

      {showSidebar && (
        <div style={{ width: '250px', backgroundColor: 'white', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex:'1100', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <Menus toggle={showSidebar} setToggle={setShowSidebar}/>
        </div>
      )}
    </Box>
  );
}

export default Navbar;
