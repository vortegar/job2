// REACT IMPORTS
import React, { useEffect } from 'react';
import { UnorderedListOutlined, BarChartOutlined, BorderOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from 'components/main_components/datagrid_component/index';

import { BrowserRouter as Router, Link } from "react-router-dom";
import { getFamilyData } from "pages/families/families_services/families_service";
import { getMaterialData } from "pages/materials/materials_services/materials_service";

import { getListProjects } from 'pages/projects/projects_services/projects_service';

const CubageProjectsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListProjects());
        //getFamilyData(dispatch, deleteId);
        //getMaterialData(dispatch, deleteId, filters);
    }, []);

    const rows = useSelector(store => store.projects.list);

    const deleteId = '';
    const filters = useSelector(store => store.materialsFilters);
    const nameStatus = {
        in_progress: 'En proceso',
        entered: 'Ingresado',
        in_cubication: 'Cubicación',
        asigned_to_cubicator: 'Asignado a cubicador'
    };

    const columns = [
        {
            field: 'project_number',
            headerName: 'N° proyecto',
            flex: 1,
            minWidth: 150,
            headerAlign: 'left',
        },
        {
            field: 'project_title',
            headerName: 'Proyecto',
            flex: 1,
            minWidth: 150,
            headerAlign: 'left',
        },
        {
            field: 'satus',
            headerName: 'Estado',
            flex: 1,
            minWidth: 150,
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
            flex: 1,
            minWidth: 150,
            headerAlign: 'left',
        },
        {
            field: 'address',
            headerName: 'Dirección',
            flex: 1,
            minWidth: 150,
            headerAlign: 'left',
        },
        {
            field: 'province',
            headerName: 'Cuidad',
            flex: 1,
            minWidth: 50,
            headerAlign: 'left',
            valueFormatter: (params) => params.value.name,
        },
        {
            field: 'commune',
            headerName: 'Comuna',
            flex: 1,
            minWidth: 50,
            headerAlign: 'left',
            valueFormatter: (params) => params.value.name,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            minWidth: 88,
            maxWidth: 230,
            flex: 1.8,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <Link to={`/project-single/${params.id}/cubage`}>
                        <ButtonComponent variant="contained" color="primary" tooltip="GENERAR FICHA">
                        <BorderOutlined />
                        </ButtonComponent>
                    </Link>
                    &nbsp;
                    <Link to={`/totalization/${params.id}`}>
                        <ButtonComponent variant="contained" color="warning" tooltip="TOTALIZACIÓN">
                            <BarChartOutlined />
                        </ButtonComponent>
                    </Link>
                    &nbsp;
                    <Link to={`/cubage/${params.id}`}>
                        <ButtonComponent variant="contained" color='success' tooltip="LISTADO DE ACTIVIDADES">
                            <UnorderedListOutlined />
                        </ButtonComponent>
                    </Link>
                </>
            )
        },
    ]

    return (
        <div>
            <MainCard>
                <div style={{ height: 600, minHeight: 650, width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGridComponent rows={rows} columns={columns} />
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    )
}

export default CubageProjectsList;