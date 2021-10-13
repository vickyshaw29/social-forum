import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CREATE_POST } from '../graphQl/mutation/Mutations';
import { FETCH_POSTS } from '../graphQl/Query/Query';
import { useSnackbar } from 'notistack';
import { useMutation} from '@apollo/react-hooks';
import Loader from './stuff/Loader';

const PostDialogue = ({ openDialogue, setOpenDialogue }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    title: '',
    body: '',
  });
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    refetchQueries:[
        {
            query:FETCH_POSTS
        }
    ],
    update(){
        setValues({title:'',body:''})
        setOpenDialogue(false)
    },
    onError(err) {
      enqueueSnackbar(
        err.graphQLErrors[0].message
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
  useEffect(() => {
    console.log(values);
  }, [values]);

  const createPostHandler = () => {
    createPost();
  };
  /* eslint-disable */
  return (
    <div>
      {loading && <Loader/>}
      <Dialog
        open={openDialogue}
        maxWidth="sm"
      >
        <Typography align="center">
          <DialogTitle>Add Post</DialogTitle>
        </Typography>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            size="small"
            fullWidth
            variant="standard"
            value={values.title}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
            type="text"
            size="small"
            fullWidth
            variant="standard"
            value={values.body}
            onChange={onChange}
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenDialogue(false)}>Cancel</Button>
          <Button
            onClick={() => setOpenDialogue(false)}
            onClick={createPostHandler}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostDialogue;
