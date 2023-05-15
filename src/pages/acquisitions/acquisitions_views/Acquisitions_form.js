import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsArray from './nested_form/ProductsArray';
import { getProvidersData } from 'pages/providers/providers_services/providers_service';
import { getTotalization } from 'pages/acquisitions/acquisitions_service/acquisitionService';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import { Button, Divider, TextField } from '../../../../node_modules/@mui/material/index';
import { Box, InputLabel, MenuItem, Select, Breadcrumbs } from '@mui/material';
import {
  RightOutlined,
  HomeOutlined,
  DeleteFilled,
  CheckOutlined,
  UpOutlined,
  DownOutlined,
  PlusOutlined,
  FileOutlined
} from '@ant-design/icons';
import List from '@mui/material/List';

import { Collapse } from '../../../../node_modules/@mui/material/index';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '../../../../node_modules/@mui/material/index';

import Chip from '@mui/material/Chip';
const Acquisitions_Form = () => {
  const dispatch = useDispatch();
  const deleteId = '';
  const { id } = useParams();

  // REACT-HOOK-FORM CONFIG
  const methods = useForm({
    mode: 'onChange'
  });
  const { control, register, handleSubmit, getValues, setValue, errors, reset, formState } = methods;

  // FILTER IMPORTS
  const filters = useSelector((store) => store.providersFilters);

  useEffect(() => {
    getProvidersData(dispatch, deleteId, filters);
    getTotalization(id, dispatch);
  }, []);

  // IMPORTING INITIAL STATE FROM THE STORE
  //const providers = useSelector(store => store.providers)

  return (
    <React.Fragment>
      <AdquisitionLayout />
    </React.Fragment>
  );
};

export default Acquisitions_Form;

const AdquisitionLayout = () => {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: '2%' }}>
        <Grid item xs={12} sm={6} mb={2}>
          <BreadcrumComponent />
        </Grid>
        <Grid item xs={12} sm={6} mb={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ background: '#6880FF', color: 'white', borderRadius: '17px', width: '100px', marginRight: '12px' }}>
            <FileOutlined />
          </Button>
          <Button sx={{ borderRadius: '17px', width: '100px', border: 'solid 1px #6880FF' }}>Regresar</Button>
        </Grid>
      </Grid>
      <div
        style={{
          padding: '20px',
          borderWidth: '2px',
          borderStyle: 'dashed',
          borderColor: '#d8d8d8',
          borderRadius: '4px',
          background: '#ebf4ff'
        }}
      >
        <h2>Familia Luminaria</h2>
        <AcquisitionsForm key={'1'} material_name={'material #1'} />
        <AcquisitionsForm key={'2'} material_name={'material #2'} />
      </div>
      <Button
        fullWidth
        style={{
          marginTop: '20px',
          padding: '20px',
          borderWidth: '2px',
          borderStyle: 'dashed',
          borderColor: '#6880FF',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          color: '#6880FF',
          background: '#e5e4e4',
          '&:hover': {
            bgcolor: 'black !important'
          }
        }}
      >
        <span style={{ marginRight: '20px' }}>Agregar familia </span> <PlusOutlined />
      </Button>
    </>
  );
};

const AcquisitionsForm = ({ material_name }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Paper sx={{ padding: ' 24px', marginBottom: '24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <b> {material_name}</b>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {' '}
            <Tooltip title="Agregar proveedor" placement="top-end">
              <IconButton
                sx={{
                  borderRadius: 'solid 1px  black',
                  borderRadius: '50%',
                  marginRight: '10px',
                  height: '30px',
                  width: '30px',
                  background: '#52c41a',
                  color: 'white'
                }}
              >
                <span>
                  <PlusOutlined />
                </span>
              </IconButton>
            </Tooltip>
            {open ? (
              <IconButton sx={{ borderRadius: '50%', height: '30px', width: '30px', height: '30px' }} onClick={handleClick}>
                {' '}
                <span>
                  <UpOutlined />
                </span>
              </IconButton>
            ) : (
              <IconButton sx={{ borderRadius: '50%', width: '30px', height: '30px' }} onClick={handleClick}>
                {' '}
                <span>
                  <DownOutlined />
                </span>
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Grid container spacing={2} sx={{ padding: '0px 20px' }}>
              <Grid item xs={2}>
                <InputLabel shrink htmlFor={'nro_register'} sx={{ textAlign: 'start' }}>
                  Nº
                </InputLabel>
                <TextField
                  fullWidth
                  name="nro_register"
                  id="nro_register"
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                      background: '#e7e7e7'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectCustom name="Proveedor" />
              </Grid>
              <Grid item xs={2}>
                <InputLabel shrink htmlFor={'amount'} sx={{ textAlign: 'start' }}>
                  Cantidad
                </InputLabel>
                <TextField fullWidth />
              </Grid>
              <Grid
                item
                xs={2}
                disabled
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000000',
                    background: '#e7e7e7'
                  }
                }}
              >
                <InputLabel shrink htmlFor={'cost'} sx={{ textAlign: 'start' }}>
                  Costo
                </InputLabel>
                <TextField id="cost" fullWidth disabled />
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Aceptar" placement="top-end">
                  <IconButton style={{ height: '40px', marginTop: '20px', marginRight: '20px' }}>
                    <CheckOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" placement="top-end">
                  <IconButton style={{ height: '40px', marginTop: '20px' }}>
                    <DeleteFilled />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Divider style={{ width: '100%', marginTop: '16px' }} sx={{ borderColor: '#b5b5b5' }} />
              <Grid item xs={6}>
                Total
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', color: '#6880FF' }}>
                <b> 0,00CLP</b>
              </Grid>
            </Grid>
          </List>
        </Collapse>
      </Paper>
    </>
  );
};

const SelectCustom = ({ items, width, placeholder, height, onChange, data, name }) => {
  const family = [
    { family: 'Luminaria', id: 1 },
    { family: 'Mallas', id: 2 }
  ];
  function selectLabel(id) {
    let selectText = family.filter((item) => item.id === id);
    return selectText[0]?.family;
  }
  return (
    <>
      {' '}
      <InputLabel shrink htmlFor={name} sx={{ textAlign: 'start' }}>
        {name}
      </InputLabel>
      <Select
        defaultValue={1}
        id={name}
        name={name}
        displayEmpty
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        renderValue={(value) => {
          return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {value ? <>{selectLabel(value)}</> : <div style={{ color: '#A9A9AC' }}>Seleccione una familia</div>}
            </Box>
          );
        }}
      >
        <MenuItem key={'default_value_select'} value={''}>
          Seleccione
        </MenuItem>
        {family?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.family}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

const BreadcrumComponent = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const breadcrumbs = [
    <span>
      <HomeOutlined />{' '}
    </span>,
    <span>Acquisición</span>,
    <span>Lista de actividades</span>
  ];

  return (
    <Breadcrumbs separator={<RightOutlined />} aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
};
