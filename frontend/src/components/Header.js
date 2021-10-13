import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PostDialogue from './PostDialogue';
import { useHistory } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import { Fragment } from 'react';
import { useStyles } from '../commonStyles/authStyles';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
// import Loader from './stuff/Loader';

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const { user, logout } = useContext(AuthContext);

  const matcheSm = theme.breakpoints.down('sm');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // for creatPost dialogue
  const [openDialogue, setOpenDialogue] = React.useState(false);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <AppBar position="fixed" color="inherit" className={classes.appbar}>
        <Toolbar variant="dense">
          <div>
            <Typography className={classes.blog} component={Link} to="/">
              Blog
            </Typography>
          </div>
          <div className={classes.authContainer}>
            {user === null ? (
              <>
                <Button
                  variant="outlined"
                  className={classes.btn}
                  component={Link}
                  to="/signup"
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  className={`${classes.btn} ${classes.login}`}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              </>
            ) : (
              <Grid container>
                <Grid
                  item
                  container
                  xs
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={
                        <AddOutlinedIcon
                          fontSize={matcheSm ? 'small' : undefined}
                        />
                      }
                      className={classes.addBtn}
                      onClick={()=>setOpenDialogue(true)}
                    >
                      New Post
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="large"
                      edge="end"
                      color="inherit"
                      aria-controls="header-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <AccountCircle fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
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
                  <MenuItem onClick={() => history.push('/profile')}>
                    <Avatar /> Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                <PostDialogue openDialogue={openDialogue} setOpenDialogue={setOpenDialogue}/>
              </Grid>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

export default Header;
