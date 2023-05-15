import React from 'react';
//REACT IMPORTS
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';

// MATERIAL IMPORTS
import { DialogActions, DialogTitle, Box, OutlinedInput, Grid, Select, MenuItem, Snackbar, TextField } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

// tableGrid
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react toolkit
import { useDispatch, useSelector } from 'react-redux';
import { postCreateProject, GetPtojectData, updatePtojectDataCubicator } from '../project-single-services/projectSingleServices';
import { downloadExcel } from 'pages/projects/projects_services/projects_service';

import { getProvinceData, getCommuneData } from 'pages/providers/providers_services/providers_service';

// RouterParams
import { useParams, useNavigate } from 'react-router-dom';

import instance from 'services/axios_config';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProvinceData(dispatch);
    getCommuneData(dispatch);
  }, []);

  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [viewProject, Set_viewProject] = useState('');
  const [dataTable, Set_dataTable] = useState([]);
  const [formUpdate, Set_formUpdate] = useState(true);
  const [item_totals, Set_item_totals] = useState([]);
  var isNew = true;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const provinces = useSelector((store) => store.provinces);

  const generateProvinceOptions = () => {
    return provinces.map((province) => {
      return (
        <MenuItem key={province.id} value={province.id}>
          {' '}
          {province.name}{' '}
        </MenuItem>
      );
    });
  };

  const communes = useSelector((store) => store.communes);
  const [listCommune, setListCommune] = useState([]);
  const [idProvince, setIdProvince] = useState('');

  const generateCommuneOptions = () => {
    return listCommune.map((commune) => {
      return (
        <MenuItem key={commune.id} value={commune.id}>
          {' '}
          {commune.name}{' '}
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    const aa = communes.filter((commune) => commune?.province?.id == idProvince);
    setListCommune(aa);
  }, [idProvince]);

  const handleBlur = (event) => {
    setIdProvince(event);
  };

  const down_load_Excel = (id) => {
    downloadExcel(id);
  };

  const value = '';

  id ? (isNew = false) : (isNew = true);

  useEffect(() => {
    if (id === undefined) isNew = true;

    if (!isNew) {
      instance
        .get('data_sheets/' + id + '/')
        .then((res) => {
          //console.log(res.data);
          Set_viewProject(res.data);
          Set_dataTable(res.data.item_descriptions);
          Set_item_totals([]);
          let items_total_set = res.data.item_totals;
          reset({
            test: []
          });
          items_total_set.map((item, index) => {
            append({ label: item.label, value: 2 });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const styleInput = { borderRadius: '10px', width: '100%', textAlign: 'center' };

  const Item = styled(Paper)(({ theme }) => ({
    border: 0,
    textAlign: 'center',
    boxShadow: 'none',
    paddingTop: '1px'
  }));

  const validationSchema = yup.object({
    project_title: yup.string().required('Requiere titulo de proyecto'),
    principal_name: yup.string().required('Requiere nombre de proyecto'),
    address: yup.string().required('Requiere dirección de proyecto'),
    province: yup.string().required('Requiere cuidad'),
    commune: yup.string().required('Requiere comuna'),
    mo: yup.string(),
    gf: yup.string(),
    gg: yup.string(),
    utl: yup.string()
  });

  // --------------------------------usarFieldArray-----------------------
  const {
    register,
    control,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      item_totals
    }
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'item_totals'
  });

  if (!isNew) {
    setValue('project_title', viewProject.project_title);
    setValue('principal_name', viewProject.principal_name);
    setValue('address', viewProject.address);
    setValue('province', viewProject?.province?.id);
    setValue('commune', viewProject?.commune?.id);
  }

  // ------------------------------- dataTable-----------------------------
  const TableItems = () => {
    return (
      <TableContainer align="center" style={{ width: '100%' }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Piso Tipo</TableCell>
              <TableCell align="center">Total Piso Tipo</TableCell>
              <TableCell align="center">Superficie Unitaria (m2)</TableCell>
              <TableCell align="center">Superficie total (m2)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.unit_area}</TableCell>
                <TableCell align="center">{row.unit_area * row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  // ------------------------------finish dataTable-------------------------

  const itemsTemp = {
    description: '',
    quantity: '',
    unit_area: ''
  };

  const validateItems = (data) => {
    // if(data.description)
    // data.description.length ? itemsTemp.description = data.description : errorItems.description.status =true

    if (data.description) itemsTemp.description = data.description;

    if (data.quantity) itemsTemp.quantity = data.quantity;

    if (data.unit_area) itemsTemp.unit_area = data.unit_area;
  };

  const insertItmes = () => {
    Set_dataTable((dataTable) => [...dataTable, itemsTemp]);
  };

  const onSubmit = (data) => {
    data.item_descriptions = dataTable;
    //console.log({ data, id });
    updatePtojectDataCubicator(id, data, navigate);
  };

  const saveAndDownload = async(data) => {
    data.item_descriptions = dataTable;
    Set_formUpdate(false);
    Promise.resolve(updatePtojectDataCubicator(id, data, navigate)).then((el) => {
      //console.log('el',el)
       down_load_Excel(id);
      }).catch((err) => {
        console.log('error promesa')
      });
      isNew = false;
  };

  return (
    <div>
      <DialogTitle sx={{ fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', padding: '9px 12px' }}>
        {isNew ? 'Nuevo projecto' : 'Editar'}
      </DialogTitle>

      <DialogTitle sx={{ padding: '9px 12px' }}>
        {isNew ? 'Ingresa los datos para poder ingresar el proyectos' : 'Ingresa los datos nuevos para editar el proyectos'}
      </DialogTitle>

      <form
        sx={{ m: 1, minWidth: 120 }}
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="N° Proyecto"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? viewProject.project_number : viewProject.project_number}
                  disabled
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Proyecto"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? value : viewProject.project_title}
                  disabled
                  {...register('project_title')}
                />
                <p style={{ color: 'red' }}>{errors.project_title?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Mandate"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? value : viewProject.principal_name}
                  {...register('principal_name')}
                  disabled
                />
                <p style={{ color: 'red' }}>{errors.principal_name?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Dirección"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? value : viewProject.address}
                  {...register('address')}
                  disabled
                />
                <p style={{ color: 'red' }}>{errors.address?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Controller
                  control={control}
                  name="province"
                  defaultValue={isNew ? '' : viewProject?.province?.id}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      style={styleInput}
                      onChange={onChange}
                      onBlur={handleBlur(value)}
                      sx={{ display: 'inline-flex', flexGrow: 1 }}
                      {...register('province')}
                      disabled
                      value={isNew ? 13 : viewProject?.province?.id}
                    >
                      {generateProvinceOptions()}
                    </Select>
                  )}
                />

                <p style={{ color: 'red' }}>{errors.province?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Controller
                  control={control}
                  name="commune"
                  defaultValue={isNew ? '' : viewProject?.commune?.id}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Select
                        style={styleInput}
                        onChange={onChange}
                        value={isNew ? value : viewProject?.commune?.id}
                        autowidth="true"
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                        {...register('commune')}
                        disabled
                      >
                        {generateCommuneOptions()}
                      </Select>
                    </>
                  )}
                />
                <p style={{ color: 'red' }}>{errors.commune?.message}</p>
              </Item>
            </Grid>

            {/* <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="MO"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.address}
                  disabled={!formUpdate}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="GF %"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.address}
                  disabled={!formUpdate}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="GG %"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.address}
                  disabled={!formUpdate}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="UTL %"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.address}
                  disabled={!formUpdate}
                />
              </Item>
            </Grid> */}

            {/* ------------------------------add label--------------------- ----*/}
            <Grid item xs={12}>
              <Item>
                <DialogTitle sx={{ padding: '9px 12px', textAlign: 'left' }}>
                  Características principales &nbsp;
                  {formUpdate ? (
                    <ButtonComponent
                      aria-label="delete"
                      type="submit"
                      variant="contained"
                      color="success"
                      onClick={() => append({ label: '', value: '' })}
                    >
                      <FileAddOutlined />
                    </ButtonComponent>
                  ) : (
                    ''
                  )}
                </DialogTitle>
              </Item>
            </Grid>

            {fields.map((item, index) => {
              return (
                <>
                  <Grid item key={index} xs={2}>
                    <Item>
                      <li>
                        <OutlinedInput
                          style={styleInput}
                          type="text"
                          placeholder="Label"
                          name={`item_totals[${index}].label`}
                          defaultValue={`${item.label}`}
                          disabled={!formUpdate}
                          required
                          {...register(`item_totals.${index}.label`)}
                        />
                        <p style={{ color: 'red' }}> {errors?.['item_totals']?.[index]?.['label']?.['message']}</p>

                        <OutlinedInput
                          style={styleInput}
                          type="number"
                          placeholder="Value"
                          name={`item_totals[${index}].value`}
                          defaultValue={`${item.value}`}
                          disabled={!formUpdate}
                          {...register(`item_totals.${index}.value`)}
                          required
                        />
                        <p style={{ color: 'red' }}> {errors?.['item_totals']?.[index]?.['value']?.['message']}</p>
                        {formUpdate ? (
                          <ButtonComponent onClick={() => remove(index)} variant="contained" color="error">
                            <DeleteOutlined />
                          </ButtonComponent>
                        ) : (
                          ''
                        )}
                      </li>
                    </Item>
                  </Grid>
                </>
              );
            })}
            {/* ------------------------------finish add label--------------------- ----*/}

            <Grid item xs={12}>
              <Item>
                <DialogTitle sx={{ padding: '9px 12px', textAlign: 'left' }}> Listado Items &nbsp;</DialogTitle>
              </Item>
            </Grid>

            {formUpdate ? (
              <>
                <Grid item xs={5}>
                  <Item>
                    <OutlinedInput
                      style={styleInput}
                      type="text"
                      placeholder="Piso Tipo"
                      onChange={(event) => validateItems({ description: event.target.value })}
                    />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <OutlinedInput
                      style={styleInput}
                      type="number"
                      placeholder="Total Piso Tipo"
                      onChange={(event) => validateItems({ quantity: event.target.value })}
                    />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <OutlinedInput
                      min="1"
                      style={styleInput}
                      type="number"
                      onChange={(event) => validateItems({ unit_area: event.target.value })}
                      placeholder="Superficie Unitaria (m2)"
                    />
                  </Item>
                </Grid>

                <Grid item xs={1}>
                  <Item>
                    <ButtonComponent
                      variant="contained"
                      color="success"
                      onClick={() => {
                        insertItmes();
                      }}
                    >
                      Agregar
                    </ButtonComponent>
                  </Item>
                </Grid>
              </>
            ) : (
              ''
            )}

            <TableItems />
          </Grid>
        </Box>
        <DialogActions>
          {/*         <ButtonComponent type="submit" variant="contained" color={'success'}>
              guardar
            </ButtonComponent> */}
          {/*           {formUpdate ? (
            <ButtonComponent type="submit" variant="contained" color={'success'}>
              guardar
            </ButtonComponent>
            ) : (
            ''
          )} */}
          {/*           {!isNew ? (
            <>
              <ButtonComponent
                onClick={() => {
                  Set_formUpdate(false); (isNew = false);
                  down_load_Excel(id);
                }}
                variant="contained"
                color={'primary'}
              >
                Generar Ficha
              </ButtonComponent>
            </>
          ) : (
            ''
          )} */}
          {/*           <ButtonComponent
            onClick={() => {
              navigate('/cubageList');
            }}
            variant="contained"
            color="error"
          >
            Volver
          </ButtonComponent> */}
        </DialogActions>
      </form>
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end', marginTop:2}}>
            <ButtonComponent onClick={handleSubmit((d) => saveAndDownload(d))} variant="contained" color={'primary'}>
              Generar Ficha
            </ButtonComponent>
            <ButtonComponent type="button" onClick={handleSubmit((data) => onSubmit(data))} variant="contained" color={'success'}>
              guardar
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                navigate('/cubageList');
              }}
              variant="contained"
              color="error"
            >
              Volver
            </ButtonComponent>
          </Grid>
        </Grid>
      </>
      <ToastContainer />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Upload...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormDialog;
