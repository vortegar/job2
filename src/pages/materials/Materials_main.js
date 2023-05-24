//lazy
import { lazy, useCallback } from 'react';

import Loadable from 'components/Loadable';

// REACT IMPORTS
import React, { useEffect, useState } from 'react';
import { IconButton, Collapse, Alert, Typography } from '@mui/material';
import { EditOutlined, 
        DeleteOutlined, 
        CloseCircleOutlined, 
        AppstoreAddOutlined, 
        FilterOutlined, UndoOutlined, 
        UploadOutlined, 
        InfoCircleOutlined, 
        DownloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

//! Esta linea no se usa
// import {BrowserRouter as Router, Link } from "react-router-dom";

// CUSTOM COMPONENTS IMPORTs
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from '../../components/main_components/datagrid_component/index';

// SLICES IMPORTS
import { setIsNew, setOpen, setOpenView, setId, setFilterView } from 'pages/materials/materials_slices/materials_states';
import{ restoreMaterial } from './materials_slices/materials_slice'

// VIEWS IMPORTS
//import ViewProduct from './materials_views/materials_view';
const ViewProduct = Loadable(lazy(() => import('./materials_views/materials_view')));
//import FormDialog from './materials_views/materials_form';
const FormDialog = Loadable(lazy(() => import('./materials_views/materials_form')));
//import MaterialsFilters from './materials_views/materials_filter';
const MaterialsFilters = Loadable(lazy(() => import('./materials_views/materials_filter')));

import { deleteData, getMaterialData, getMaterialDataMain } from './materials_services/materials_service';

import { setFamilyFilter, setSubFamilyFilter } from './materials_slices/materials_filter';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MaterialsUpload } from './materials_views/materials_upload';
import { getFamilyData } from 'pages/families/families_services/families_service';
import { getSubFamilyData } from 'pages/sub_families/subFamilies_services/subFamilies_services';
import { Grid } from '../../../node_modules/@mui/material/index';



const SamplePage = () => {

  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState('');
  const [uploadView, setUploadView] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  
  // IMPORTING STATES FROM THE STORE
  const open = useSelector(store => store.productsStates.open);
  const id = useSelector(store => store.productsStates.id);
  const openView = useSelector(store => store.productsStates.openView);
  const filterView = useSelector(store => store.productsStates.filterView);
  
  // FILTER IMPORTS
  const filters = useSelector(store => store.materialsFilters);
//   console.log(filters)
  
  // IMPORTING INITIAL STATE FROM THE STORE
  const rows = useSelector(store => store.materials);

  const filt = rows.filter((material) => material.id === 0);

  //* Se agrega
  const [count, setCount] = useState(0);
  const [limitPage, setLimitPage] = useState(200);
  const [offsetPage, setOffsetPage] = useState(0);
  const [countFamily, setCountFamily] = useState(0);
  const [showBtnLoad, setShowBtnLoad] = useState(true);
  const [rowsLoading, setRowsLoading] = useState(false);  
  const [countSubfamily, setCountSubfamily] = useState(0);
  const [hiddenBtnLoad, setHiddenBtnLoad] = useState(false);  


// IMPORT DATA FROM API
  useEffect(() => {
    getMaterialData( dispatch, deleteId, filters, setRowsLoading, limitPage, setCountSubfamily, countSubfamily, setCountFamily, countFamily );
  }, [count]);

 useEffect(() => {
    getSubFamilyData( dispatch, deleteId, filters, countSubfamily );
 }, [count]);

 useEffect(() => {
    getFamilyData( dispatch, deleteId, countFamily );
 }, [count]);


  const increment = async() => {

    const textLimitMaterial =  await document.querySelector('p.MuiTablePagination-displayedRows');
    const textContent = await textLimitMaterial.textContent;
    const splitArray =  textContent.split(' de ');
    const limitNumber =  Number(splitArray[1]);

    if( limitPage > limitNumber ) {
        setHiddenBtnLoad( true );
    };

    setOffsetPage(offsetPage + 100);
    setLimitPage(limitPage + 100)
    setCount( count  + 1 );
  };



 // DATAGRID COLUMNS CONFIGURATION
  const columns = [
    {
        field: 'name',
        headerName: 'Nombre',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
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

    // STATES UPDATE FUNCTIONS
    const closeModal = () => {
        dispatch(setOpen(false));
        dispatch(setIsNew(true));
        setTimeout(() => {
            getMaterialData(dispatch, deleteId, filters);
        }, 1000)
        
    }

    const closeFilter = () => {
        dispatch(setFilterView(false));
        setCount( count  + 1 );
        setShowBtnLoad(false)
        //! Se elimina este codigo
        // setTimeout(() => {
    // getMaterialData( dispatch, deleteId, filters, setRowsLoading, limitPage, setCountSubfamily, countSubfamily, setCountFamily, countFamily );
            // console.log(filters)
            // getMaterialData(dispatch, deleteId, filters);
        // }, 1000)
    }

    // DELETE PRODUCT FROM STORE FUNCTION
    const handleDelete = (id) => {
        console.log(id)
        
        deleteData(id);
        setDeleteId(id)
        setCount( count  + 1 );

        // setTimeout(() => {
        //     getMaterialData(dispatch, deleteId, filters);
        // }, 1000)
        
    };

    // product_view STATE SETTING FUNCTION
    const closeView = () => {
        dispatch(setOpenView(false));
        setOpenAlert(false);
    }

    const closeUpload = () => {
        setUploadView(false);
    }

    const handleClearFilter = () => {
        setShowBtnLoad(true)
        setCount( count  + 1 );

        dispatch(restoreMaterial());
        dispatch(setFamilyFilter(""));
        dispatch(setSubFamilyFilter(""));
    }

    return (
        <>
            {open ? <FormDialog abrir={open} closeModal={closeModal} id={id} product={rows.filter(product => product.id === id)} /> : ''}
            {openView ? <ViewProduct abrir={openView} closeModal={closeView} id={id} product={rows.filter(product => product.id === id)} /> : ''}
            <MaterialsFilters 
                abrir={filterView} 
                closeFilter={closeFilter} 
                increment={increment} 
                />
            <MaterialsUpload open={uploadView} closeUpload={closeUpload}/>
            <Collapse in={openAlert} timeout={500}>
                <Alert
                    severity="success"
                    sx={{ width: '100%' }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                 y           <CloseCircleOutlined />
                        </IconButton>
                    }>
                    Eliminado correctamente
                </Alert>
            </Collapse>
            <br />
            <MainCard title="Listado de Materiales" >
                <ToastContainer />
                <Grid container >
                <Grid item xs={6} >
                <ButtonComponent onClick={() => { dispatch(setOpen(true)) }} variant="contained" color="primary"><AppstoreAddOutlined />&nbsp;&nbsp;Agregar Material</ButtonComponent>
                <ButtonComponent onClick={() => {setUploadView(true)}} variant="contained" color="success"><UploadOutlined />&nbsp;&nbsp;Carga Masiva</ButtonComponent>
                </Grid>
                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <ButtonComponent onClick={() => { dispatch(setFilterView(true)) }} variant="contained" color="info"><FilterOutlined />&nbsp;&nbsp;Filtros</ButtonComponent>
                <ButtonComponent onClick={() => { handleClearFilter() }} variant="contained" color="info"><UndoOutlined />&nbsp;&nbsp;Limpiar Filtros</ButtonComponent>
                </Grid>
                </Grid>
                <br />
                <div style={{ height: 500, width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGridComponent 
                                rows={rows} 
                                columns={columns} 
                                loading={rows.length === 0 || rowsLoading }
                                setOffsetPage = { setOffsetPage }
                                setLimitPage  = { setLimitPage }
                                limitPage = { limitPage }
                                offsetPage = { offsetPage }
                                increment=  {increment}
                            />
                        </div>
                    </div>
                </div>
            </MainCard>
            <div style={{ display: 'flex', 
                        justifyContent: 'center', 
                        flexDirection: 'column', 
                        width: '30%',
                        margin: '0 auto'
                        }}>
               
                {
                    (hiddenBtnLoad) 
                        ? <Alert severity="success">Todos los materiales han sido cargados</Alert>
                        :
                        <> { (showBtnLoad) && (
                                <>
                                <Typography variant="caption" style={{ margin: '10px auto' }} fontWeight="bold">
                                {limitPage} <Typography variant="caption" >materiales cargados</Typography> 
                            </Typography>
                            <ButtonComponent 
                                onClick={ increment }
                                disabled={rowsLoading}
                                variant="contained" 
                                color="success">
                                    <DownloadOutlined  />&nbsp;&nbsp;Cargar materiales 
                            </ButtonComponent> 
                                </>

                        )}
                            
                        </>  
                                         
                }
                
            </div>
        </>
    );
};

export default SamplePage;
