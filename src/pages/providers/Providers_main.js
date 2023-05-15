import React, { useEffect, useState, lazy } from 'react';
import Loadable from 'components/Loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
  FileExcelOutlined,
  FilterOutlined,
  UndoOutlined,
  UploadOutlined
} from '@ant-design/icons';
// CUSTOM COMPONENTS IMPORTs
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from '../../components/main_components/datagrid_component/index';

// SLICES IMPORTS
import { setIsNew, setOpen, setOpenView, setId, setDownloadView, setFilterView, setUploadView } from './providers_slices/providers_states';
import {
  setSpecialityFilter,
  setTypeFilter,
  setMethodFilter,
  setRegionFilter,
  setProvinceFilter,
  setCommuneFilter
} from './providers_slices/providers_filters';
import { restoreProvider } from './providers_slices/providers_slice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// VIEWS IMPORTS

//import ProvidersForm from './providers_views/providers_form';
const ProvidersForm = Loadable(lazy(() => import('./providers_views/providers_form')));
import {
  deleteData,
  getProvidersData,
  downladReport,
  getRegionData,
  getProvinceData,
  getCommuneData,
  getSpecialties
} from './providers_services/providers_service';

//import ProvidersDownload from './providers_views/providers_download';
const ProvidersDownload = Loadable(lazy(() => import('./providers_views/providers_download')));

//import ProvidersFilters from './providers_views/providers_filters';
const ProvidersFilters = Loadable(lazy(() => import('./providers_views/providers_filters')));

//import ProvidersView from './providers_views/providers_view';
const ProvidersView = Loadable(lazy(() => import('./providers_views/providers_view')));

//import ProvidersUpload from './providers_views/providers_upload';
const ProvidersUpload = Loadable(lazy(() => import('./providers_views/providers_upload')));

const Providers = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState('');

  // FILTER IMPORTS
  const filters = useSelector((store) => store.providersFilters);

  // IMPORT DATA FROM API
  useEffect(() => {
    getProvidersData(dispatch, deleteId, filters);
    getRegionData(dispatch);
    getProvinceData(dispatch);
    getCommuneData(dispatch);
    getSpecialties(dispatch);
  }, []);

  // IMPORTING INITIAL STATE FROM THE STORE
  const rows = useSelector((store) => store.providers);

  // IMPORTING STATES FROM THE STORE
  const openView = useSelector((store) => store.providersStates.openView);
  const open = useSelector((store) => store.providersStates.open);
  const id = useSelector((store) => store.providersStates.id);
  const downloadView = useSelector((store) => store.providersStates.downloadView);
  const filterView = useSelector((store) => store.providersStates.filterView);
  const uploadView = useSelector((store) => store.providersStates.uploadView);

  // DATAGRID COLUMNS CONFIGURATION
  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'social_reason',
      headerName: 'Razon Social',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'commune',
      headerName: 'Comuna',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'speciality',
      headerName: 'Especialidad',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'product_type',
      headerName: 'Producto',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'payment_method',
      headerName: 'Metodo de pago',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'view',
      headerName: 'Acciones',
      sortable: false,
      minWidth: 168,
      maxWidth: 170,
      flex: 1.0,
      headerAlign: 'center',

      renderCell: (params) => (
        <>
          {/*<ButtonComponent onClick={() => { dispatch(setOpenView(true)), dispatch(setId(params.id)) }}
                        variant="outlined" color="success">
                        <EyeOutlined />
                    </ButtonComponent>&nbsp;&nbsp;*/}
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

  // STATES UPDATE FUNCTIONS MODAL
  const closeModal = () => {
    dispatch(setOpen(false));
    dispatch(setIsNew(true));
    getProvidersData(dispatch, filters);
  };

  // DELETE PRODUCT FROM STORE FUNCTION
  const handleDelete = (id) => {
    dispatch(restoreProvider());
    deleteData(id);
    setDeleteId(id);
    toast('Eliminado');
    setTimeout(() => {
      getProvidersData(dispatch, deleteId, filters);
    }, 1000);
  };

  const closeDownload = () => {
    dispatch(setDownloadView(false));
  };

  const closeFilter = () => {
    dispatch(setFilterView(false));
  };

  // VIEW STATE SETTING FUNCTION
  const closeView = () => {
    dispatch(setOpenView(false));
  };

  // DOWNLOAD DATA FUNCTION
  const handleDownload = () => {
    downladReport(filters);
  };

  const closeUpload = () => {
    dispatch(setUploadView(false));
  };

  const handleClearFilter = () => {
    dispatch(setSpecialityFilter(''));
    dispatch(setTypeFilter(''));
    dispatch(setMethodFilter(''));
    dispatch(setRegionFilter(''));
    dispatch(setProvinceFilter(''));
    dispatch(setCommuneFilter(''));
    dispatch(restoreProvider());
    setTimeout(() => {
      getProvidersData(dispatch, filters);
    }, 1000);

    closeFilter();
  };

  return (
    <>
      {open ? <ProvidersForm abrir={open} closeModal={closeModal} id={id} provider={rows.filter((provider) => provider.id === id)} /> : ''}
      <ProvidersDownload abrir={downloadView} closeDownload={closeDownload} />
      <ProvidersFilters abrir={filterView} closeFilter={closeFilter} />
      {openView ? <ProvidersView abrir={openView} closeView={closeView} provider={rows.filter((provider) => provider.id === id)} /> : ''}
      <ProvidersUpload open={uploadView} closeUpload={closeUpload} />
      <br />
      <MainCard title="Listado de Provedores">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <ButtonComponent
              onClick={() => {
                dispatch(setOpen(true));
              }}
              variant="contained"
              color="primary"
            >
              <AppstoreAddOutlined />
              &nbsp;&nbsp;Agregar Proveedor
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                handleDownload();
              }}
              variant="contained"
              color="success"
            >
              <FileExcelOutlined />
              &nbsp;&nbsp;Excel
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                dispatch(setUploadView(true));
              }}
              variant="contained"
              color="success"
            >
              <UploadOutlined />
              &nbsp;&nbsp;Carga Masiva
            </ButtonComponent>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonComponent
              onClick={() => {
                dispatch(setFilterView(true));
              }}
              variant="contained"
              color="info"
            >
              <FilterOutlined />
              &nbsp;&nbsp;Filtros
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                handleClearFilter();
              }}
              variant="contained"
              color="info"
            >
              <UndoOutlined />
              &nbsp;&nbsp;Limpiar Filtros
            </ButtonComponent>
          </Grid>
        </Grid>
        <ToastContainer />
        <br />
        <div style={{ height: 500, minHeight: 650, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGridComponent rows={rows} columns={columns} loading={rows.length === 0} />
              {/*loading={rows.length === 1}*/}
            </div>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default Providers;
