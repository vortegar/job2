//REACT IMPORTS

import {useEffect} from 'react';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';

import { Controller, useForm } from 'react-hook-form';


import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { setOpenFilter } from '../projects_slices/projects_states';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogTitle, Box, Grid, TextField, Select, MenuItem  } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

// http Axios
import { getListProjects } from '../projects_services/projects_service';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const styleInput = { borderRadius: '10px', width: '100%', textAlign: 'center' };
const Item = styled(Paper)(({ theme }) => ({
  border: 0,
  textAlign: 'center',
  boxShadow: 'none',
  paddingTop: '1px'
}));


const Projects_Filters = (props) => {
  
  const dispatch = useDispatch();
  const { abrir } = props;

  const handleClose = () => {
    dispatch(setOpenFilter(false));
  };

  const onSubmit = (data) => {
    dispatch(getListProjects(data))
    handleClose();
  }

  const resetFilter = ()=>{
    reset();
    dispatch(getListProjects({}))
    handleClose();
  }

  // YUP SCHEME SETUP
  const validationSchema = yup.object({
    project_number: yup.string(),
    project_title: yup.string(),
    status: yup.string(),
    principal_name: yup.string(),
    address: yup.string(),
   });
   
  const { register,control,  handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  

  const nameStatus = [
    {id:'in_progress', name: 'En proceso'},
    {id:'entered', name: 'Ingresado'},
    {id:'in_cubication', name: 'Cubicación'}
  ];

  const generateListStatus = () => {
    <MenuItem Selected >
    {'Selecione estado'}
    </MenuItem>

    return nameStatus.map((status, index) => {
      return (
        <MenuItem key={index} value={status.id}>
          {status.name}
        </MenuItem>
      );
    });
  };


  return (
    <div>
      <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 600 },"& .MuiInputBase-root": { margin: '9px' } }}>
        <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}> Filtros </DialogTitle>
        <form sx={{ m: 1, minWidth: 20 }} onSubmit={handleSubmit((data) => { onSubmit(data); })}>
          <Box m={2}  sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item={true} xs={6}>
                <TextField 
                  type="text"
                  label="N° proyecto"
                  {...register("project_number")}
                  />
              </Grid>
              <Grid item={true} xs={6}>
                <TextField
                  type="text"
                  label="Proyecto"
                  {...register("project_title")}
                  />
              </Grid>
               <Grid item={true} xs={6}>
                {/* <TextField
                  // type="text"
                  // label="Estado"
                  {...register("status")}
                  /> */}
                  {/* <label htmlFor="actual-btn">Estado</label> */}
                  <Controller
                    control={control}
                    name="status"
                    // defaultValue={ !idSupervisor ? '' : idSupervisor}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        style={{ 
                              borderRadius: '4px',
                              width: '200px',
                              textAlign: 'center'
                            }}
                        onChange={onChange}
                        autowidth="true"
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                        {...register('status')}
                        // value={!idSupervisor ? value : idSupervisor}
                      >
                        {generateListStatus()}
                      </Select>
                    )}
                  />
                  <p style={{ color: 'red' }}>{errors.supervised_by?.message}</p>

              </Grid>
              <Grid item={true} xs={6}>
                <TextField
                  type="text"
                  label="Mandante"
                  {...register("principal_name")}
                  />
              </Grid>
              <Grid item={true} xs={6}>
                <TextField
                  type="text"
                  label="Dirección"
                  {...register("address")}
                  />
              </Grid>
            </Grid>
          </Box>
          <DialogActions>
            <ButtonComponent type="submit" variant="contained" color={"info"} >Filtrar</ButtonComponent>
            <ButtonComponent onClick={()=>{resetFilter()}} variant="contained" color="error">limpiar filtros</ButtonComponent>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Projects_Filters;