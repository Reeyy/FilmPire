import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Serach/Search';
import { fetchToken, moviesApi, createSessionId } from '../../utils';
import { setUser, userSelector } from '../../features/auth';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector(userSelector);
  //* tidak perlu menggunakan userSelector((state)=>state.auth)
  //* karena sudah di lakukan di userSelector
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>

      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => {}}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                onClick={() => {}}
                className={classes.linkButton}
              >
                <AccountCircle />
                {!isMobile && <>  My Movies &nbsp; </>}
                {/* <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://www.themoviedb.org/t/p/w64_and_h64_face"
                /> */}
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>

      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              className={classes.drawerBackground}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}
