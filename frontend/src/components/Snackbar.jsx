import React from 'react';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@mui/styles';
import { Button, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const snackbarStyles = makeStyles({
  success: {
    background: '#FCFFF5 0% 0% no-repeat padding-box',
    border: '1px solid #A8C599',
    color: '#1E561F',
    '& button': {
      color: '#1E561F',
    },
  },
  error: {
    background: '#FFF6F6 0% 0% no-repeat padding-box',
    border: '1px solid #973937',
    color: '#973937',
    '& button': {
      color: '#973937',
    },
  },
  warning: {
    background: '#FFFAF3 0% 0% no-repeat padding-box',
    border: '1px solid #CCBEA0',
    color: '#7A4D05',
    '& button': {
      color: '#7A4D05',
    },
  },
  info: {
    background: '#F8FFFF 0% 0% no-repeat padding-box',
    border: '1px solid #BEDFE6',
    color: '#0E566C',
    '& button': {
      color: '#0E566C',
    },
  },
});

const CustomSnackbar = (props) => {
  const styles = snackbarStyles();

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={4}
      classes={{
        variantSuccess: styles.success,
        variantError: styles.error,
        variantWarning: styles.warning,
        variantInfo: styles.info,
      }}
      style={{
        minWidth: 'max-content',
        borderRadius: 4,
        fontFamily: 'Roboto',
        paddingLeft: 30,
        boxShadow: 'unset',
        marginBottom: '.5rem',
        zIndex: 99999999,
      }}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      hideIconVariant
      TransitionComponent={Slide}
      action={(key) => (
        <Button onClick={() => onClickDismiss(key)}>
          <CloseIcon style={{color:'#fff'}}/>
        </Button>
      )}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default CustomSnackbar;
