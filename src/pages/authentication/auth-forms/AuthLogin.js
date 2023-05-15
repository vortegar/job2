import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { login } from '../../../services/authServices';
import PageLoader from  '../../loader/loader';

import Snackbar from '@mui/material/Snackbar';

// circular loanding
import CircularProgress from '@mui/material/CircularProgress';
/* import Box from '@mui/material/Box'; */

// redux
import { useDispatch, useSelector } from 'react-redux';
/* import { Provider } from 'react-redux';
import { store } from '../../../store'; */

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import { getMaterialDataMain } from 'pages/materials/materials_services/materials_service';

// ============================|| FIREBASE - LOGIN ||============================ //

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthLogin = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [validUser, setvalidUser] = useState(true);

  const handleClick = () => setShowConditionalText((showConditionalText) => !showConditionalText);

  let handleChange = (event) => {
    if (!event.target.value.length) setvalidUser(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true)
    login(data).then((response) => {
        window.localStorage.setItem('token', response.data.access);
        let decode = jwtDecode(response.data.access).status === 'disabled';
        console.log('userdecode', jwtDecode(response.data.access).status)
        if(decode){
          return navigate('activate-user');
        }
        setTimeout(() => {
          getMaterialDataMain(dispatch, setLoading, navigate)
        }, 300);
        
    })
    .catch(function (error) {
      console.log(error)
        setLoading(false)
        setOpen(true);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="login">Usuario</InputLabel>
              {/* <TextField */}
              <OutlinedInput
                //   label="Usuario"
                type="text"
                name="username"
                placeholder="Usuario"
                fullWidth
                disabled={loading}
                {...register('username', { required: true })}
                onChange={handleChange}
                //   error
                //   helperText="Incorrect entry."
              />
              {errors.username && setvalidUser && <span style={{ color: 'red' }}>Campo requerido</span>}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Contraseña</InputLabel>
              <OutlinedInput
                fullWidth
                type={showPassword ? 'text' : 'password'}
                disabled={loading}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Contraseña"
                {...register('password', { required: true })}
              />
              {errors.password && <span style={{ color: 'red' }}>Campo requerido</span>}
            </Stack>
          </Grid>
          {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Grid>
          )}
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
                {!loading && 'Iniciar sesión' }
                {loading && <CircularProgress /> }
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error de usuario o contraseña
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthLogin;

