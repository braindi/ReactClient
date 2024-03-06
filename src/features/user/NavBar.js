import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, useNavigate, NavLink, json } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, Avatar, Stack, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { userOut } from './userSlice';
import BasketIcon from '../order/BasketIcon';
import { Toast } from 'primereact/toast';
import Zoom from '@mui/material/Zoom';
import logo from '../imgLogo/logo.png';

//     V         V          V     V
//אורח יהיהו הקישורים: כניסה, הרשמה, כל המוצרים, סל קניות
//   V                     V             V
//רשום יהיו הקישורים: כל המוצרים , סל קניות , כפתור יציאה )קישור
//  V                      V           V 
//למנהל יוצגו – הוספת מוצר, כל המוצרים, כל ההזמנות, יציאה
export function NavBar() {
  let dispatch = useDispatch()

  let nameUser = useSelector(state => state.thisUser.currentUser)?.data.userName;
  let userRole = useSelector(state => state.thisUser.currentUser)?.data.role;

  const toast = React.useRef(null);


  const exit = () => {
    toast.current.show({ severity: 'success', detail: `התנתקת`, life: 2000 });
    // setTimeout(() => {
    dispatch(userOut());
    // }, 2000);
  }

  return (<>

    <div style={{ textAlign: "right" }}>
      <Toast ref={toast} />
    </div>

    <div style={{ direction: "rtl" }}>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ width: "100%" }} >
          <Toolbar sx={{ bgcolor: "#fff" }}>
            <Typography style={{ marginLeft: "10px" }}>
              {!nameUser && <div style={{ color: "black", fontSize: "20px" }}> שלום אורח</div>}
              {nameUser && <div style={{ color: "black", fontSize: "20px" }}> {`שלום ${nameUser}`} </div>}
            </Typography>


            <Typography>
              <Link to="" ><Button color='error' size='large' style={{ fontSize: "16px", marginRight: "4px" }}>כל המוצרים</Button></Link>
            </Typography>

            <Typography>
              {userRole && userRole == "ADMIN" && <Link to="addBag"><Button color='error' size='large' style={{ fontSize: "16px" }}>הוספת מוצר</Button></Link>}
            </Typography>

            <Typography>
              {userRole && userRole == "ADMIN" && <Link to=""><Button color='error' size='large' style={{ fontSize: "16px" }}>כל ההזמנות </Button></Link>}
              {userRole == "USER" && <Button color='error' size='large' style={{ fontSize: "16px" }}>ההזמנות שלי</Button>}
            </Typography>

            <Typography sx={{ flexGrow: 1 }}>
              {/* {userRole && <Link to="" ><Button sx={{ color: '#212121' }} onClick={exit}><i className="pi pi-sign-out" /></Button> </Link>} */}
              {userRole && <Link to="" ><Button color='error' size='large' style={{ fontSize: "16px" }} onClick={exit}>התנתקות</Button> </Link>}

              {/* {!userRole && <Link to="login" ><Button sx={{ color: '#212121' }}><i className="pi pi-sign-in" /></Button> </Link>} */}
              {!userRole && <Link to="login" ><Button color='error' size='large' style={{ fontSize: "16px", marginRight: "4px" }}>התחברות</Button> </Link>}
            </Typography>

            <Typography sx={{ direction: "ltr" }} style={{ marginLeft: "0px", left: "0px", marginRight: "10px" }}>
              {(!userRole || userRole == "USER") && <Tooltip TransitionComponent={Zoom} title="הסל שלי"><Link to="fullBasket" > <BasketIcon /></Link></Tooltip>}
            </Typography>

            <Typography>
              <img src={logo} alt='logo' style={{ height: "60px", borderRadius: "0px", marginTop: "4px", marginRight: "10px" }} />
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  </>
  );
}