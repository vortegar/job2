//lazy
import { lazy } from 'react';

import Loadable from 'components/Loadable';


// REACT IMPORTS
import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, CloudUploadOutlined, SelectOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// CUSTOM COMPONENTS IMPORTs
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from '../../components/main_components/datagrid_component/index';

// services
import { getListProjects, deleteProject, listFileProject } from './projects_services/projects_service';

import { useNavigate, Link } from 'react-router-dom';

//import ListDocuments from './projects_views/projects_list_document';
const ListDocuments = Loadable(lazy(() => import('./projects_views/projects_list_document')));

//import Projects_Filters from './projects_views/projects_filters';
const Projects_Filters = Loadable(lazy(() => import('./projects_views/projects_filters')));

//import Assignment from './projects_views/assignment';
const Assignment = Loadable(lazy(() => import('./projects_views/assignment')));

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { setOpenView, setOpenFilter, setOpenAssignment } from './projects_slices/projects_states';

const SamplePage = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [projStatus, setProjStatus] = useState();
  const [idSupervisor, setIdSupervisor] = useState();
  const [idCubicator, setIdCubicator] = useState();
  const [open, setOpen] = React.useState(false);
  const openView = useSelector((store) => store.projectsStates.openView);
  const openFilter = useSelector((store) => store.projectsStates.openFilter);
  const openAssignment = useSelector((store) => store.projectsStates.openAssignment);
  const navigate = useNavigate()
  const listStatus ={
    in_progress: true,
    entered: false,
    in_cubication: true
  }

  const getStatus = (status) =>{
    setProjStatus(listStatus[status])
  }

  // ------------get List Projects ------------
  useEffect(() => {
    dispatch(getListProjects());
  }, [dispatch]);
  const rows = useSelector((store) => store.projects.list);

  // -------------Alert Mesagge----------

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // ------------Delete Projects------------
  const handleDelete = (id) => {
    dispatch(deleteProject(id));
    setOpen(true);
  };

  const closeView = () => {
    dispatch(setOpenView(false));
  };

  const closeFilter = () => {
    dispatch(setOpenFilter(false));
  };

  const closeAssignment = () => {
    dispatch(setOpenAssignment(false));
  };


  
  const nameStatus = {
    in_progress: 'En proceso',
    entered: 'Ingresado',
    in_cubication: 'Cubicación',
    asigned_to_cubicator: 'Asignado a cubicador'
  };

  // DATAGRID COLUMNS CONFIGURATION
  const columns = [
    {
      field: 'project_number',
      headerName: 'N° proyecto',
      flex: 1,
      minWidth: 200,
      headerAlign: 'left'
    },
    {
      field: 'project_title',
      headerName: 'Proyecto',
      flex: 1,
      minWidth: 200,
      headerAlign: 'left'
    },
    {
      field: 'status',
      headerName: 'Estado',
      flex: 1,
      minWidth: 100,
      headerAlign: 'left',
      renderCell: (params) => (
        <>
          <p>{nameStatus[params.row.status]}</p>
        </>
      )
    },
    {
      field: 'principal_name',
      headerName: 'Mandante',
      minWidth: 200,
      headerAlign: 'left'
    },
    {
      field: 'address',
      headerName: 'Dirección',
      flex: 1,
      minWidth: 200,
      headerAlign: 'left'
    },
    {
      field: 'province',
      headerName: 'Cuidad',
      flex: 1,
      minWidth: 100,
      headerAlign: 'left',
      valueFormatter: (params) => params.value.name
    },
    {
      field: 'commune',
      headerName: 'Comuna',
      flex: 1,
      minWidth: 100,
      headerAlign: 'left',
      valueFormatter: (params) => params.value.name
    },
    {
      field: 'Editar',
      headerName: 'Editar',
      minWidth: 40,
      headerAlign: 'left',
      renderCell: (params) => (
        <>
          <Link to={`/project-single/${params.id}`}>
            <ButtonComponent variant="contained" color="success">
              <EditOutlined />
            </ButtonComponent>
          </Link>
        </>
      )
    },
    {
      field: 'Ver',
      headerName: 'Ver',
      minWidth: 50,
      headerAlign: 'left',
      renderCell: (params) => (
        <>
          <ButtonComponent
            variant="contained"
            onClick={() => {
              setId(params.id), dispatch(setOpenView(true)), dispatch(listFileProject(params.id));
            }}
            color="info"
          >
            <CloudUploadOutlined />
          </ButtonComponent>
        </>
      )
    },
    // {
    //   field: 'Asignación',
    //   headerName: 'Asignación',
    //   minWidth: 100,
    //   headerAlign: 'left',
    //   renderCell: (params) => (
    //     <>
    //       <ButtonComponent
    //         variant="contained"
    //         onClick={() => {
    //           setId(params.id), 
    //           getStatus(params.row.status),
    //           setIdSupervisor(params.row.supervised_by),
    //           setIdCubicator(params.row.cubicator),
    //            dispatch(setOpenAssignment(true));
    //         }}
    //         color="secondary"
    //       >
    //         <SelectOutlined />
    //       </ButtonComponent>
    //     </>
    //   )
    // },
    {
      field: 'Eliminar',
      headerName: 'Eliminar',
      sortable: false,
      minWidth: 40,
      flex: 0.6,
      headerAlign: 'left',
      renderCell: (params) => (
        <>
          <ButtonComponent onClick={() => handleDelete(params.id)} variant="contained" color="error">
            <DeleteOutlined />
          </ButtonComponent>
        </>
      )
    }
  ];

  return (
    <>
      <ListDocuments
        id={id}
        abrir={openView}
        closeModal={() => {
          closeView;
        }}
      />
      <Projects_Filters
        abrir={openFilter}
        closeModal={() => {
          closeFilter;
        }}
      />
      <Assignment
        id={id}
        status={projStatus}
        idSupervisor={idSupervisor}
        idCubicator={idCubicator}
        abrir={openAssignment}
        closeModal={() => {
          closeAssignment;
        }}
      />

      <br />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Proyecto borrado correctamente
        </Alert>
      </Snackbar>

      <MainCard title="Inventario de Proyectos">
        <ButtonComponent
          onClick={() => {
            //window.location = '/project-single/';
            navigate('/project-single/');
          }}
          variant="contained"
          color="primary"
        >
          <AppstoreAddOutlined />
          &nbsp;&nbsp;Agregar Proyecto
        </ButtonComponent>

        <ButtonComponent
          onClick={() => {
            dispatch(setOpenFilter(true));
          }}
          variant="contained"
          color="info"
        >
          <AppstoreAddOutlined />
          &nbsp;&nbsp;Filtros
        </ButtonComponent>

        <br />
        <div style={{ height: 500, minHeight: 650, width: '100%' }}>
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

export default SamplePage;
