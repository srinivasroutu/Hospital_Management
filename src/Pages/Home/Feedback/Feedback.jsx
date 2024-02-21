import React, { useRef, useState } from 'react';
import { Button, Snackbar, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const AlzheimerPrediction = () => {
  const form = useRef();
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function predictAlzheimer(e) {
    e.preventDefault();

    const formData = new FormData(form.current);
    const fileInput = document.querySelector('input[type="file"]');

    if (fileInput.files.length === 0) {
      alert('Please select an image.');
      return;
    }

    formData.append('image', fileInput.files[0]);

    axios.post('http://127.0.0.1:5000/predictAlzheimer', formData)
      .then(response => {
        setPredictionResult(response.data.result);
        setErrorMessage(null);
        handleClick('Alzheimer\'s prediction successful')();
      })
      .catch(error => {
        console.error('Error predicting Alzheimer\'s:', error);
        setErrorMessage('Error predicting Alzheimer\'s');
        setPredictionResult(null);
        handleClick('Error predicting Alzheimer\'s')();
      });
  }

  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <h3 style={{ marginTop: "1rem", textAlign: "left", color: 'orange' }}>
        {/* Display a message or title */}
      </h3>
      <form onSubmit={predictAlzheimer} ref={form}>
        <TextField
          autoComplete='off'
          id="outlined-multiline-flexible"
          label="Patient's Name"
          name='name'
          sx={{ width: '90%', mt: 3 }}
        />
        <TextField
          type="file"
          id="outlined-multiline-flexible"
          label="Upload Brain Image"
          name='image'
          inputProps={{ accept: '.jpg, .jpeg, .png' }}
          sx={{ width: '90%', mt: 3 }}
        />
        <Button
          type='submit' color='secondary' variant='contained' sx={{ width: '90%', mt: 4 }}
        >
          Predict Alzheimer's
        </Button>
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
          message={messageInfo ? messageInfo.message : undefined}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </form>
      {errorMessage && (
        <div>
          <h4>Error:</h4>
          <p>{errorMessage}</p>
        </div>
      )}
      {predictionResult !== null && !errorMessage && (
        <div>
          <h4>Prediction Result:</h4>
          <p>{predictionResult}</p>
        </div>
      )}
    </div>
  );
};

export default AlzheimerPrediction;
