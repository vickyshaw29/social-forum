import React, { useEffect, useState,useContext} from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CREATE_USER } from '../../graphQl/mutation/Mutations';
import { useMutation } from '@apollo/react-hooks';
import { useStyles } from '../../commonStyles/authStyles';
import { AuthContext } from '../../context/auth';

const SignUp = ({ history }) => {
  const classes = useStyles();
  const {user}=useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [register] = useMutation(CREATE_USER, {
    update(proxy, result) {
      history.push('/login');
    },
    variables: values,
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
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const registerHandler = () => {
    register();
  };
  /* eslint-disable */
  useEffect(()=>{
    if(user!==null){
      history.push('/')
    }
  },[user])
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.mainContainer}
    >
      <Grid
        item
        component={Paper}
        elevation={10}
        className={classes.formContainer}
      >
        <Typography align="center" className={classes.title} gutterBottom>
          Register
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
          id="email"
          label="Email"
          variant="outlined"
          margin="dense"
          type="email"
          size="small"
          className={classes.textField}
          fullWidth
          value={values.email}
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
          <Button variant="contained" onClick={registerHandler}>
            Register
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SignUp;
