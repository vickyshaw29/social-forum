import { makeStyles } from '@mui/styles';

export const useStyles= makeStyles((theme) => ({
  title: {
    ...theme.typography.fontF,
    fontSize: '1.6rem !important',
    fontWeight: 500,
  },
  btn:{
    width:140,
    height:'1.9rem',
    [theme.breakpoints.down('sm')]:{
      width:90,
    }
  },
  addBtn:{
    width:140,
    [theme.breakpoints.down('sm')]:{
        width:130
    },
    borderRadius:'50px !important'
  },
  textField: {
    marginBottom: '1rem !important',
  },
  mainContainer: {
    minHeight: '85vh',
  },
  formContainer: {
    padding: '20px 40px 20px 40px',
    maxWidth:'30rem'
  },
  toolbarMargin: {
    marginBottom: '4.2rem',
  },
  authContainer: {
      marginLeft:'auto',
      minWidth:'15rem'
  },
  register:{
    
  },
  login:{
    marginLeft:'1rem !important',
  },
  apppbar:{
    zIndex: theme.zIndex.modal + 1,
    boxShadow: ' 0px 0.7px 0px #E5E9F2',
    backgroundColor: theme.palette.common.white,
  },
  blog:{
      fontFamily:'Arizonia !important',
      fontSize:'1.7rem !important'
  }
}));

