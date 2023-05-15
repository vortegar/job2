// REACT IMPORTS
import React, { useEffect, useState } from 'react';
import BasicGrid from './totalization_components/grid';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalization } from './totalization_services/totalization_service';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import instance from 'services/axios_config';
// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none'
}));

// RouterParams
import { useParams, useNavigate} from 'react-router-dom';

const SamplePage = () => {
  const dataTotalization = useSelector((store) => store.totalization_slice.list);
  const { id } = useParams();
  const navigate =  useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalization(id));
  }, []);

  const downLoadExcel = ()=>{
    //console.log(id)

    instance.get('totalization-reports/'+id+'/',{responseType: 'blob'})
    .then((res)=>{
        const href = URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'totalizacion.xlsx'); 
        document.body.appendChild(link);
        link.click();
    }).catch((res)=>{
        console.log(res);
    }) 


  }

  return (
    <>
      <br />
      <MainCard title="Totalización">
        <div style={{ justifyContent:'space-between', display:'flex', marginBottom: 6 }}>
        <ButtonComponent variant="contained" onClick={() => navigate('/cubageList')} >
          Volver
        </ButtonComponent>
        <ButtonComponent  variant="contained" color={'success'} onClick={downLoadExcel} >
          Descargar
        </ButtonComponent>
        </div>

        <BasicGrid data={dataTotalization} />
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <div style={{ flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                {/* -------------------- Por familia --------------------------- */}
                {dataTotalization?.material_group_material?.map((familia, index) => {
                  return (
                    <Grid container key={index} spacing={1}>
                      <Grid item xs={12}>
                        <Item>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow style={{ background: '#bbe6fb' }}>
                                  <TableCell sx={{ minWidth: 120 }}>CODIGO</TableCell>
                                  <TableCell align="left" sx={{ minWidth: 550 }}>
                                    {familia?.material_family}
                                  </TableCell>
                                  <TableCell align="left" sx={{ minWidth: 120 }}>
                                    UNIDAD
                                  </TableCell>
                                  <TableCell align="left" sx={{ minWidth: 120 }} colSpan="100%">
                                    Total
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {familia?.family_materials.map((row, index1) => {
                                  return (
                                    <TableRow key={index1} style={index1 % 2 ? { background: '#e5f5fd' } : { background: 'white' }}>
                                      <TableCell component="th" scope="row">
                                        {row.material_code}
                                      </TableCell>
                                      <TableCell align="left">{row.material_name}</TableCell>
                                      <TableCell align="left">{row.material_measure_unit}</TableCell>
                                      <TableCell align="left">{row.material_levels[0].total_h.toLocaleString()}</TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Item>
                      </Grid>
                    </Grid>
                  );
                })}
              </Box>
            </div>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default SamplePage;
