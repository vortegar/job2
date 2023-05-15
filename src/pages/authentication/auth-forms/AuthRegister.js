import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import CircularProgress from '@mui/material/CircularProgress';
import { activateUsers } from '../../../services/authServices';
import { useParams, Link, useNavigate } from "react-router-dom";
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
  password: yup.string().min(8, 'La contraseña debe tener 8 caracteres mínimo').matches(/[0-9]/, 'contraseña require un número').matches(/[A-Z]/, 'contraseña requiere una letra mayúscula'),
  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
});
const AuthRecover = () => {

  const values = queryString.parse(location.search);
  const token = values.token;
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

  const onSubmit = (data) => {
    setLoading(true);
    data.token = token;
    activateUsers(data)
    .then((response) => {
      console.log(response);
      setLoading(false);
        return navigate('/');
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <>
       <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
                {...register('confirm_password', { required: true })}
              />
              {errors.confirm_password && <span style={{ color: 'red' }}>{errors.confirm_password.message}</span>}
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
                {!loading && 'Restablecer' }
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

export default AuthRecover;