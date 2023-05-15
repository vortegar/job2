import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { recoverPassword } from '../../../services/authServices';

import Snackbar from '@mui/material/Snackbar';

// circular loanding
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// redux
import { Provider } from 'react-redux';
import { store } from '../../../store';

// material-ui
import {
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';

// ============================|| FIREBASE - LOGIN ||============================ //

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RecoverPasswordForm = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [validUser, setvalidUser] = useState(true);

  const handleClick = () => setShowConditionalText((showConditionalText) => !showConditionalText);

  let handleChange = (event) => {
    //console.log('handleChange', event.target.value.length);
    if (!event.target.value.length) setvalidUser(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true)
    recoverPassword(data)
    .then(function (response) {
        //console.log(response);
        setLoading(false);
    })
    .catch(function (error) {
        console.log(error);
        setLoading(false);
        setOpen(true);
      });
  };

  return (
    <>
      {/* {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => ( */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">Correo</InputLabel>
              {/* <TextField */}
              <OutlinedInput
                type="email"
                name="email"
                placeholder="Email"
                fullWidth
                disabled={loading}
                {...register('email', { required: true })}
                onChange={handleChange}

              />
              {errors.email && setvalidUser && <span style={{ color: 'red' }}>Campo requerido</span>}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={loading}
                // disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                {!loading && 'Recuperar' }
                {loading && <CircularProgress /> }
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error al tratar de recuperar
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecoverPasswordForm;
