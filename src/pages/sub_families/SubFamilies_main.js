//lazy
import { lazy } from 'react';

import Loadable from 'components/Loadable';



// REACT IMPORTS
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// DESIGN IMPORTS
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, FilterOutlined, UndoOutlined } from '@ant-design/icons';

// CUSTOM COMPONENTS IMPORTS
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from 'components/main_components/datagrid_component/index';

// STATES IMPORTS
import { setIsNew, setOpen, setId, setFilterView } from './subFamilies_slices.js/subFamilies_states';
import {restoreSubFamily} from './subFamilies_slices.js/subFamilies_slice'

// VIEW IMPORTS
//import SubFamiliesForm from './subFamilies_views/subFamilies_form';
const SubFamiliesForm = Loadable(lazy(() => import('./subFamilies_views/subFamilies_form')));
//import SubFamiliesFilters from './subFamilies_views/subFamilies_filter';
const SubFamiliesFilters = Loadable(lazy(() => import('./subFamilies_views/subFamilies_filter')));

// AXIOS METHODS IMPORTS
import { deleteData, getSubFamilyData } from './subFamilies_services/subFamilies_services';


import { setFamilyFilter } from './subFamilies_slices.js/subFamilies_filters';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid } from '../../../node_modules/@mui/material/index';


const SubFamilies = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState('');

  // FILTER IMPORTS
  const filters = useSelector(store => store.subFamiliesFilters);

  // IMPORT DATA FROM API
  useEffect(() => {
    getSubFamilyData(dispatch, deleteId, filters);
  }, [])

  const rows = useSelector(store => store.subFamilies);

  // IMPORTING STATES FROM THE STORE
  const open = useSelector(store => store.subFamiliesStates.open);
  const id = useSelector(store => store.subFamiliesStates.id);
  const filterView = useSelector(store => store.subFamiliesStates.filterView);


  // DATAGRID COLUMNS CONFIGURATION
  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1.7,
      minWidth: 150,
      headerAlign: 'center',
    },
    {
      field: 'material_family_name',
      headerName: 'Familia Padre',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
    },
    {
      field: 'view',
      headerName: 'Acciones',
      sortable: false,
      minWidth: 168,
      maxWidth: 170,
      flex: 0.6,
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
    dispatch(restoreSubFamily());
    dispatch(setOpen(false));
    dispatch(setIsNew(true));
    setTimeout(() => {
      getSubFamilyData(dispatch, deleteId, filters);
    }, 1000)
  }

  const handleDelete = (id) => {
    dispatch(restoreSubFamily());
    deleteData(id);
    setDeleteId(id);
    setTimeout(() => {
      getSubFamilyData(dispatch, deleteId, filters);
    }, 1000)
    
  };

  const closeFilter = () => {
    dispatch(restoreSubFamily());
    dispatch(setFilterView(false));
    setTimeout(() => {
      getSubFamilyData(dispatch, deleteId, filters);
    }, 1000)
  }

  const handleClearFilter = () => {
    dispatch(restoreSubFamily());
    dispatch(setFamilyFilter(""));
    setTimeout(() => {
      getSubFamilyData(dispatch, deleteId, filters);
    }, 1000)
    
    closeFilter();
  }



  return (
    <>
      {open ? <SubFamiliesForm abrir={open} closeModal={closeModal} id={id} product={rows.filter(product => product.id === id)} /> : ''}
      <SubFamiliesFilters abrir={filterView} closeFilter={closeFilter}/>
      <MainCard title="Listado de Sub familias">
        <ToastContainer />
        <Grid container>
          <Grid item xs={6}>
        <ButtonComponent onClick={() => { dispatch(setOpen(true)) }} variant="contained" color="primary"><AppstoreAddOutlined />&nbsp;&nbsp;Agregar Sub Familia</ButtonComponent>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <ButtonComponent onClick={() => {dispatch(setFilterView(true))}} variant="contained" color="info"><FilterOutlined />&nbsp;&nbsp;Filtros</ButtonComponent>
        <ButtonComponent onClick={() => {handleClearFilter()}} variant="contained" color="info"><UndoOutlined />&nbsp;&nbsp;Limpiar Filtros</ButtonComponent>
          </Grid>
        </Grid>
        <br />
        <div style={{ height: 500, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGridComponent rows={rows} columns={columns} loading={rows.length === 0}/> {/* loading={rows.length === 1} */}
            </div>
          </div>
        </div>
      </MainCard>
    </>
  )
}

export default SubFamilies;