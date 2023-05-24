import React, { useEffect, useState, lazy } from 'react';

import Loadable from 'components/Loadable';

// REACT IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppstoreAddOutlined, TableOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

// CUSTOM COMPONENTS IMPORTs
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from '../../components/main_components/datagrid_component/index';
import { getCubageData } from './cubage_services/cubage_projects_services';
import { addCurrentCubage } from './cubage_slices/current_cubage_slice';

import { Link } from 'react-router-dom';

//import CubageAddForm from './cubage_views/cubage_add_form';
const CubageAddForm = Loadable(lazy(() => import('./cubage_views/cubage_add_form')));
const CubageMessage = Loadable(lazy(() => import('./cubage_views/cubage_message')));

import { getUserCubicatorData, getUserSupervisorData } from './cubage_services/cubage_service';
import { setOpen, setMessage } from './cubage_slices/cubage_states/cubage_main_states';
import { getListProjects } from 'pages/projects/projects_services/projects_service';
import { restoreCubageProject } from './cubage_slices/full_cubage_sections/cubageProjects_slice';
import { ConsoleView } from 'react-device-detect';

const CubageComponent = () => {
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState('');

  const { pid } = useParams();

  useEffect(() => {
    dispatch(restoreCubageProject());
    getCubageData(dispatch, deleteId, pid);
    getUserCubicatorData(dispatch);
    getUserSupervisorData(dispatch);
    dispatch(getListProjects());
  }, []);

  const materials = useSelector((store) => store.materials);
  // console.log( materials.length )
  const { open, message } = useSelector((store) => store.cubageMainStates);
  // DATA IMPORT FRFM STORE
  const rows = useSelector((store) => store.cubageProjects);

  const cubicationSubmit = (params) => {
    dispatch(addCurrentCubage(params.row));
  };


  const columns = [
    {
      field: 'project_title',
      headerName: 'Projecto',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'activity',
      headerName: 'Actividad',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'start_date',
      headerName: 'Fecha de Inicio',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'created_by_name',
      headerName: 'Creado Por',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      minWidth: 88,
      maxWidth: 120,
      flex: 1.0,
      renderCell: (params) => (
        <>
        {
          (materials.length === 0 ) 
            ?
                <ButtonComponent 
                  onClick={() => {
                    dispatch(setMessage(true));
                  }} 
                  variant="contained" 
                  color="secondary" 
                  tooltip="Cubicar Actividad">
                  <TableOutlined />
              </ButtonComponent>
            
            :<Link to={`/cubageForm/${pid}/${params.id}`}>
                <ButtonComponent variant="contained" color="secondary" tooltip="Cubicar Actividad">
                  <TableOutlined />
                </ButtonComponent>
            </Link>
        }
        </>
      )
    }
  ];
  const closeModal = () => {
    dispatch( restoreCubageProject() );
    dispatch( setOpen(false) );
    dispatch( setMessage( false) )
    setTimeout(() => {
      getCubageData(dispatch, deleteId, pid);
      getCubageData(dispatch, deleteId, pid);
    }, 1000)
    
  };
   
  return (
    <>
      <ToastContainer />
      <CubageMessage abrir={message} closeModal={closeModal} pid={pid} />
      <CubageAddForm abrir={open} closeModal={closeModal} pid={pid} />
      <MainCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to={`/cubagelist`}>
          <ButtonComponent variant="contained" color='warning' tooltip="Listado de proyectos">
            <ArrowLeftOutlined />&nbsp;&nbsp;Volver
          </ButtonComponent>
        </Link>
          <ButtonComponent
            onClick={() => {
              dispatch(setOpen(true));
              // dispatch(setMessage(true));
            }}
            variant="contained"
            color="primary"
          >
            <AppstoreAddOutlined />
            &nbsp;&nbsp;Agregar Actividad
          </ButtonComponent>
        </Box>

        <br />
        <div style={{ height: 600, minHeight: 650, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGridComponent rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default CubageComponent;
