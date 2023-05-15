//lazy
import { lazy } from 'react';

import Loadable from 'components/Loadable';

// REACT IMPORTS
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// CUSTOM COMPONENTS IMPORTS
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from 'components/main_components/datagrid_component/index';

// SLICE IMPORTS
import { setIsNew, setOpen, setOpenFilter, setId } from './families_slices.js/families_states';

// AXIOS METHODS IMPORTS
import { deleteData, getFamilyData } from './families_services/families_service';

// VIEW IMPORTS
//import FamiliesForm from './families_views/families_form';
const FamiliesForm = Loadable(lazy(() => import('./families_views/families_form')));

import { ToastContainer, toast } from 'react-toastify';
import Families_filters from './families_views/families_filter';

import 'react-toastify/dist/ReactToastify.css';
import { restoreFamily } from './families_slices.js/families_slice';
import { Grid } from '../../../node_modules/@mui/material/index';

const Families = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState('');

  // IMPORT DATA FROM API
  useEffect(() => {
    getFamilyData(dispatch, deleteId);
  }, []);

  // IMPORT DATA FROM STORE
  const rows = useSelector((store) => store.families);

  // IMPORTING STATES
  const open = useSelector((store) => store.familiesStates.open);
  const id = useSelector((store) => store.familiesStates.id);
  const openFilter = useSelector((store) => store.familiesStates.openFilter);

  // DATAGRID CONFIG
  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1.7,
      headerAlign: 'left'
    },
    {
      field: 'description',
      headerName: 'Descripcion',
      flex: 2.5,
      // minWidth: 150,
      headerAlign: 'left'
    },
    {
      field: 'view',
      headerName: 'Acciones',
      sortable: false,
      // minWidth: 168,
      // maxWidth: 170,
      flex: 0.6,
      headerAlign: 'center',

      renderCell: (params) => (
        <>
          <ButtonComponent
            onClick={() => {
              dispatch(setOpen(true)), dispatch(setIsNew(false)), dispatch(setId(params.id));
            }}
            variant="outlined"
            color="secondary"
            tooltip="Editar"
          >
            <EditOutlined />
          </ButtonComponent>
          &nbsp;&nbsp;
          <ButtonComponent onClick={() => handleDelete(params.id)} variant="contained" color="error" tooltip="Eliminar">
            <DeleteOutlined />
          </ButtonComponent>
        </>
      )
    }
  ];

  // STATES UPDATE FUNCTIONS
  const closeModal = () => {
    dispatch(restoreFamily());
    dispatch(setOpen(false));
    dispatch(setIsNew(true));
    setTimeout(() => {
      getFamilyData(dispatch, deleteId);
    }, 1000);
  };

  // DELETE PRODUCT FROM STORE FUNCTION
  const handleDelete = (id) => {
    dispatch(restoreFamily());
    deleteData(id);
    setDeleteId(id);
    setTimeout(() => {
      getFamilyData(dispatch, deleteId);
    }, 1000);
  };

  return (
    <>
      <Families_filters
        abrir={openFilter}
        closeModal={() => {
          closeFilter;
        }}
      />

      {open ? <FamiliesForm abrir={open} closeModal={closeModal} id={id} product={rows.filter((product) => product.id === id)} /> : ''}
      <MainCard title="Listado de familias">
        <ToastContainer />
        <Grid container>
          <Grid item xs={6}>
            <ButtonComponent
              onClick={() => {
                dispatch(setOpen(true));
              }}
              variant="contained"
              color="primary"
            >
              <AppstoreAddOutlined />
              &nbsp;&nbsp;Agregar Familia
            </ButtonComponent>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonComponent
              onClick={() => {
                dispatch(setOpenFilter(true));
              }}
              variant="contained"
              color="success"
            >
              <FilterOutlined />
              &nbsp;&nbsp;Filtro
            </ButtonComponent>
          </Grid>
        </Grid>
        <br />
        <div style={{ height: 600, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGridComponent rows={rows} columns={columns} loading={rows.length === 0} />
            </div>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default Families;
