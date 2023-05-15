// REACT IMPORTS
import React, { useEffect, useState } from 'react';
import { AppstoreAddOutlined, TableOutlined, UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import MainCard from 'components/MainCard';
import ButtonComponent from 'components/main_components/button_component/index';
import DataGridComponent from 'components/main_components/datagrid_component/index';

import { BrowserRouter as Router, Link } from "react-router-dom";
import { getFamilyData } from "pages/families/families_services/families_service";
import { getMaterialData } from "pages/materials/materials_services/materials_service";


import { getListProjects } from 'pages/projects/projects_services/projects_service';

const AcquisitionsMain = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListProjects());
        getFamilyData(dispatch, deleteId);
    }, []);

    const rows = useSelector(store => store.projects.list);

    const deleteId = '';
    const filters = useSelector(store => store.materialsFilters);
    //getMaterialData(dispatch, deleteId, filters);

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
            headerName: 'Titulo',
            flex: 1,
            minWidth: 150,
            headerAlign: 'left',
        },
        {
            field: 'principal_name',
            headerName: 'Nombre director',
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
            maxWidth: 200,
            flex: 1.0,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <Link to={`/acquisitionsform/${params.id}`}>
                        <ButtonComponent variant="outlined" color='secondary' tooltip="Listado de Actividades">
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
                <div style={{ height: 500, width: '100%' }}>
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

export default AcquisitionsMain;