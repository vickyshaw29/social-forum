import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Grid, Menu, MenuItem } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loader from '../components/stuff/Loader'
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_POST } from '../graphQl/mutation/Mutations';
import { FETCH_POSTS } from '../graphQl/Query/Query';

const Cards = ({ posts, history }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [id, setId] = useState({
    postId:''
  });

  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    variables: id,
    refetchQueries: [
      {
        query: FETCH_POSTS,
      },
    ],
    update() {},
    onError(err) {
      enqueueSnackbar(
        err.graphQLErrors[0]?.message
          ? err.graphQLErrors[0].message
          : 'Something went wrong',
        {
          variant: 'error',
        }
      );
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'View post', id: 'view', link: '/user/id' },
    { label: 'Delete post', id: 'delete', link: '' },
  ];

  const handleDelete = () => {
    if(localStorage.getItem('jwtToken')){
      deletePost();
    }else{
      enqueueSnackbar(
        'Please login to perform action',
        {
          variant: 'info',
        }
      );
    }
  };

  const handleMenuItemClick = (val) => {
    switch (val.id) {
      case 'view':
        history.push(`/post/${id}`);
        setAnchorEl(null);
        break;
      case 'delete':
        handleDelete();
        setAnchorEl(null);
        break;
      default:
        break;
    }
  };
  useEffect(()=>{
    console.log(id)
  },[id])
  /* eslint-disable */
  return (
    <Grid container spacing={2}>
      {loading && <Loader/>}
      {posts &&
        posts.map((post) => (
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {post.username[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => {
                      handleClick(e);
                      setId({
                        postId:post.id
                      });
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.username}
                subheader={new Date(post.createdAt).toLocaleDateString(
                  undefined,
                  options
                )}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {post.title && post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
        
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        elevation={3}
      >
        {menuItems.map((menu) => (
          <MenuItem
            onClick={handleClose}
            onClick={() => handleMenuItemClick(menu)}
            key={menu.label}
          >
            {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

export default Cards;
