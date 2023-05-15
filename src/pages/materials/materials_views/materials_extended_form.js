import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, Collapse, Alert, Divider, Chip, Box, InputLabel, FormControl, Select, Grid, TextField } from '@mui/material';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined, AppstoreAddOutlined, FilterOutlined, UndoOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// CUSTOM COMPONENTS IMPORTs
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from 'components/main_components/datagrid_component/index';
import TextFieldComponent from 'components/main_components/textfield_component/index';

// SLICES IMPORTS
import { setIsNew, setOpen, setOpenView, setId, setFilterView } from 'pages/materials/materials_slices/materials_states';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from '../../../../node_modules/react-router-dom/dist/index';

const MaterialsExtendedForm = () => {

    const { id } = useParams();


    // DATAGRID COLUMNS CONFIGURATION
    const columns = [
        {
            field: 'name',
            headerName: 'Nombre',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            editable: true
        },
        {
            field: 'description',
            headerName: 'Descripcion',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
        },
        {
            field: 'price',
            headerName: 'Precio',
            flex: 0.5,
            minWidth: 100,
            headerAlign: 'center',
        },
        {
            field: 'material_family',
            headerName: 'Familia',
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
        },
        {
            field: 'material_subfamily',
            headerName: 'Sub Familia',
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
        },
        {
            field: 'code',
            headerName: 'Codigo',
            flex: 0.6,
            minWidth: 110,
            headerAlign: 'center',
        },
        {
            field: 'measure_unit',
            headerName: 'Unidad',
            flex: 0.3,
            minWidth: 100,
            headerAlign: 'center',
        },
        {
            field: 'view',
            headerName: 'Acciones',
            sortable: false,
            minWidth: 168,
            maxWidth: 250,
            flex: 0.9,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <ButtonComponent onClick={() => { dispatch(setOpen(true)), dispatch(setIsNew(false)), dispatch(setId(params.id)) }}
                        variant="outlined" color='secondary' tooltip='Editar'>
                        <EditOutlined />
                    </ButtonComponent>&nbsp;&nbsp;
                    <ButtonComponent onClick={() => handleDelete(params.id)} variant="contained" color='error' tooltip='Eliminar'>
                        <DeleteOutlined />
                    </ButtonComponent>
                </>
            )
        },
    ]


    // IMPORTING INITIAL STATE FROM THE STORE
    const rows = useSelector(store => store.materials);

    console.log(rows);

    const rows1 = [
        { id: 1, name: "hola" }
    ]


    return (
        <MainCard>
            <Box
                sx={{
                    '& .MuiTextField-root': { m: -1, width: '25ch' },
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                }}
                noValidate
            >
                <Grid>
                    <Grid>
                        <Grid>
                            <TextFieldComponent id="name" label="Nombre" type="text" />
                            <TextFieldComponent id="description" label="Descripcion" type="text" />
                            <TextFieldComponent id="code" label="Codigo" type="text" />
                            <TextFieldComponent id="price" label="Precio" type="number" />
                            <TextFieldComponent id="measure_unit" label="Unidad de medida" type="text" />
                        </Grid>
                        
                    </Grid>
                </Grid>

                {/*<Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                <Controller
                  control={control}
                  name="material_subfamily"
                  defaultValue={isNew ? '' : product[0].material_subfamily_id}
                  render={({ field: { onChange, value } }) => (
                    <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                      <InputLabel>Sub Familia</InputLabel>
                      <Select onChange={onChange} value={value} autowidth='true'
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                      >
                        {generateSubFamilyOptions()}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                <Controller
                  control={control}
                  name="material_family"
                  defaultValue={isNew ? '' : product[0].material_family_id}
                  render={({ field: { onChange, value } }) => (
                    <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                      <InputLabel>Familia</InputLabel>
                      <Select onChange={onChange} value={value} autowidth='true'
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                      >
                        {generateFamilyOptions()}
                      </Select>
                    </FormControl>
                  )}
                />
                  </Box>*/}
            </Box>
            <Divider>

            </Divider>

            <div style={{ height: 500, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid rows={rows} columns={columns} sx={{border:1, color:'gray'}}/> {/*loading={rows.length === 1}*/}
                    </div>
                </div>
            </div>
        </MainCard>
    )

}

export default MaterialsExtendedForm;
