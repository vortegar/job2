//lazy
import { lazy } from 'react';

import Loadable from 'components/Loadable';



// REACT IMPORTS
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// DESIGN IMPORTS
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// CUSTOM COMPONENTS IMPORTS
import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from 'components/main_components/datagrid_component/index';

// STATES IMPORTS
import { setIsNew, setOpen, setId } from './users_slices/users_states';
import { restoreUser } from './users_slices/users_slice';

// AXIOS METHODS IMPROTS
import { deleteData, getUserData } from './users_services/users_services';

//import UsersForm from './users_views/users_form';
const UsersForm = Loadable(lazy(() => import('./users_views/users_form')));

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Users = () => {
    const dispatch = useDispatch();
    const [deleteId, setDeleteId] = useState('');

    // IMPORT DATA FROM API
    useEffect(() => {
        dispatch(restoreUser());
        getUserData(dispatch, deleteId);
    }, [])

    const rows = useSelector(store => store.users);


    // IMPORTING STATES FROM THE STORE
    const open = useSelector(store => store.usersStates.open);
    const id = useSelector(store => store.usersStates.id);

    // DATAGRID COLUMNS CONFIGURATION
    const columns = [
        {
            field: 'first_name',
            headerName: 'Nombre',
            flex: 1.7,
            minWidth: 150,
            headerAlign: 'center',
        },
        {
            field: 'last_name',
            headerName: 'Apellido',
            flex: 2,
            minWidth: 150,
            headerAlign: 'center',
        },
        {
            field: 'email',
            headerName: 'EMail',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
        },
        {
            field: 'rut',
            headerName: 'Rut',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
        },
        {
            field: 'view',
            headerName: 'Acciones',
            sortable: false,
            minWidth: 168,
            flex: 0.6,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <ButtonComponent onClick={() => { dispatch(setOpen(true)), dispatch(setIsNew(false)), dispatch(setId(params.id)) }}
                        variant="contained" color='success' tooltip='Editar'>
                        <EditOutlined />
                    </ButtonComponent>&nbsp;&nbsp;
                    <ButtonComponent onClick={() => handleDelete(params.id)} variant="contained" color='error'tooltip='Eliminar'>
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
            getUserData(dispatch, deleteId);
        }, 1000)
    }

    const handleDelete = (id) => {
        dispatch(restoreUser());
        deleteData(id);
        setDeleteId(id);
        setTimeout(() => {
            getUserData(dispatch, deleteId);
        }, 1000)
        
    };

    return (
        <>
            {open ? <UsersForm abrir={open} closeModal={closeModal} id={id} user={rows.filter(product => product.id === id)} /> : ''}
            <MainCard title="Listado de Usuarios">
                <ToastContainer />
                <ButtonComponent onClick={() => { dispatch(setOpen(true)) }} variant="contained" color="primary"><AppstoreAddOutlined />&nbsp;&nbsp;Agregar Usuario</ButtonComponent>
                <br />
                <div style={{ height: 500, width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGridComponent rows={rows} columns={columns} loading={rows.length === 0} />
                        </div>
                    </div>
                </div>
            </MainCard>
        </>
    )
}

export default Users;