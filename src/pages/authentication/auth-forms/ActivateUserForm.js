import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import CircularProgress from '@mui/material/CircularProgress';
import { activateUser } from '../../../services/authServices';
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { yupResolver } from '@hookform/resolvers/yup';
import AnimateButton from 'components/@extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import instance from 'services/axios_config';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// material-ui
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
const FormSchema = yup.object().shape({
  password: yup.string().min(8, 'La contraseña debe tener 8 caracteres mínimo'),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
});
const ActivateUserForm = () => {

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(FormSchema)});
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [validUser, setvalidUser] = useState(true);

  const handleClick = () => setShowConditionalText((showConditionalText) => !showConditionalText);

  let handleChange = (event) => {
/*     console.log('handleChange', event.target.value.length); */
    if (!event.target.value.length) setvalidUser(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //const token = window.localStorage.getItem('token');
  const onSubmit = (data) => {
/*     setLoading(true);
    instance.post('users/activation/', data)
    .then((response) => {
      window.localStorage.setItem('token', response.data.access);
      setLoading(false);
      return navigate('/projects');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {

          console.log('Error', error.message);
        }
        console.log(error.config);
        setLoading(false);
      }); */
  };

  return (
    <>
       <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
        <Typography style={{textAlign: 'center'}} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Bienvenido, actualice su contraseña para continuar
            </Typography>  
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="login">Contraseña</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="contraseña"
                fullWidth
                disabled={loading}
                {...register('password', { required: true })}
                onChange={handleChange}

              />
              {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="confirm">Confirmar</InputLabel>
              <OutlinedInput
                fullWidth
                type={showPassword ? 'text' : 'confirm'}
                disabled={loading}
                name="confirm"
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
                placeholder="Confirmar"
                {...register('confirm', { required: true })}
              />
              {errors.confirm && <span style={{ color: 'red' }}>{errors.confirm.message}</span>}
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
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                {!loading && 'Continuar' }
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

export default ActivateUserForm;
