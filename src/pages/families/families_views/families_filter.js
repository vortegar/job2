//REACT IMPORTS

import { useEffect } from 'react';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';

import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setOpenFilter } from '../families_slices.js/families_states';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogTitle, Box, Grid, TextField, Select, MenuItem } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

// http Axios
// import { getListProjects } from '../projects_services/projects_service';
import { getFamilyData } from '../families_services/families_service'

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const styleInput = { borderRadius: '10px', width: '100%', textAlign: 'center' };
const Item = styled(Paper)(({ theme }) => ({
  border: 0,
  textAlign: 'center',
  boxShadow: 'none',
  paddingTop: '1px'
}));

const Families_filters = (props) => {
  const dispatch = useDispatch();
  const { abrir } = props;

  const handleClose = () => {
    dispatch(setOpenFilter(false));
  };

  const onSubmit = (data) => {
    //console.log(data)
    dispatch(getFamilyData(data));
    handleClose();
  };

  const resetFilter = () => {
    reset();
    dispatch(getFamilyData({}));
    handleClose();
  };

  // YUP SCHEME SETUP
  const validationSchema = yup.object({
    project_number: yup.string(),
    project_title: yup.string(),
    status: yup.string(),
    principal_name: yup.string(),
    address: yup.string()
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  return (
    <div>
      <Dialog
        open={abrir}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { borderRadius: '14px', width: 600 }, '& .MuiInputBase-root': { margin: '9px' } }}
      >
        <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}> Filtros </DialogTitle>
        <form
          sx={{ m: 1, minWidth: 20 }}
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <Box m={2} sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item={true} xs={6}>
                <TextField type="text" label="Nombre" {...register('project_number')} />
              </Grid>

              <Grid item={true} xs={6}>
                <TextField type="text" label="Descripción" {...register('project_title')} />
              </Grid>
              
            </Grid>
          </Box>
          <DialogActions>
            <ButtonComponent type="submit" variant="contained" color={'info'}>
              Filtrar
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                resetFilter();
              }}
              variant="contained"
              color="error"
            >
              limpiar filtros
            </ButtonComponent>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Families_filters;
