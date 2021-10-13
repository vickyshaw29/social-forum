import React, { useState, useContext } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useStyles } from '../../commonStyles/authStyles';

import { LOGIN_USER } from '../../graphQl/mutation/Mutations';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../context/auth';
import { useSnackbar } from 'notistack';
import Loader from '../../components/stuff/Loader';

const Login = ({ history }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login } }) {
      context.login(login);
      history.push('/');
    },
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
    variables: values,
  });
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleLogin = () => {
    login();
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.mainContainer}
    >
      {loading && <Loader/>}
      <Grid
        item
        component={Paper}
        elevation={10}
        className={classes.formContainer}
      >
        <Typography align="center" className={classes.title} gutterBottom>
          Login
        </Typography>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="dense"
          type="text"
          size="small"
          className={classes.textField}
          fullWidth
          value={values.username}
          onChange={onChange}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          margin="dense"
          type="password"
          size="small"
          className={classes.textField}
          fullWidth
          value={values.password}
          onChange={onChange}
        />
        <Typography align="center">
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
