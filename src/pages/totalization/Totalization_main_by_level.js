// REACT IMPORTS
import React, { useEffect, useState } from 'react';
import BasicGrid from './totalization_components/grid';
import MainCard from 'components/MainCard';
// import DataTableGroups from './totalization_components/table_groups';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none'
}));

// RouterParams
import { useParams } from 'react-router-dom';

const SamplePage = () => {
  const dataTotalization = useSelector((store) => store.totalization_slice.list);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalization(id));
  }, []);

  //console.log(dataTotalization);
  return (
    <>
      <br />
      <MainCard title="Totalización">
        <BasicGrid data={dataTotalization} />
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>

              {/* ---------------------Block por piso -------------------------- */}
              {dataTotalization?.levels?.map((level, indexPiso) => {
                var sumaLateral 
                return (
                  <Box sx={{ flexGrow: 1 }}>

                    {/* -------------------- Por familia --------------------------- */}
                    {dataTotalization?.material_group_material?.map((familia, index) => {
                      return (
                        <Grid container spacing={1}>
                          <Grid item xs={10}>
                            <Item>
                              <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                  <TableHead>
                                    <TableRow style={{ background: '#bbe6fb' }}>
                                      <TableCell>CODIGO</TableCell>
                                      <TableCell align="left">{familia?.material_family}</TableCell>
                                      <TableCell align="left">UNIDAD</TableCell>
                                      {/* ----------------------------------Nombre Dptos ------------------------ */}
                                      

                                      {familia?.family_materials.map((totalVertical, dpto) => {
                                        
                                        const detailLevel = totalVertical.material_levels.find(a => a.material_level == level.level)
                                        
                                        // console.log('totalVertical', totalVertical)

                                        if (detailLevel)
                                          var cantidad = totalVertical.material_levels.filter(a => a.material_level == level.level)   
                                       //console.log('cantidad', cantidad)
                                        
                                       { cantidad?.map((a, indexDpto)=>{
                                        //console.log('a', a)  
                                        return(
                                            <TableCell align="left">Piso</TableCell>
                                          );
                                        })}
                                        

                                      })}
                                      <TableCell align="left" colSpan='100%'>Cantidades por piso</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {/* levels = piso */}
                                    {/* material_group_material[] = familia */}
                                    {/* family_materials[] = detalle familia */}
                                    {/* material_levels[] = detalle matetiales */}

                                    {familia?.family_materials.map((row, index1) => {

                                      const detailLevel = row.material_levels.find(a => a.material_level == level.level)

                                      // ----------------agregar codigo si pertenece --------------------
                                      if (detailLevel) {
                                        var code = row?.material_code
                                        var cantidad = row.material_levels.filter(a => a.material_level == level.level)
                                        var cantidad = row.material_levels.filter(a => a.material_level == level.level)

                                      }

                                      return (
                                        <TableRow key={index1} style={index1 % 2 ? { background: '#e5f5fd' } : { background: 'white' }}>
                                          <TableCell component="th" scope="row">
                                            {code}
                                          </TableCell>
                                          <TableCell align="left">{detailLevel?.material_name}</TableCell>
                                          <TableCell align="left">{detailLevel?.material_measure_unit}</TableCell>

                                          {/* ---------------------- cantidad por familia ---------------------- */}
                                          {cantidad?.map((cant, index) => {
                                            return (
                                              <TableCell align="left">{cant.material_qty}</TableCell>
                                            )

                                          })}
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                  {/* <TableRow style={{ background: '#bbe6fb' }}>
                                    <TableCell></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>
                                      TOTAL
                                    </TableCell>
                                    
                                    {familia?.family_materials.map((totalVertical, indexVertical) => 
                                    {
                                      const detailLevel = totalVertical.material_levels.find(a => a.material_level == level.level)
                                      console.log('detailLevel', detailLevel )
                                        
                                        // if (detailLevel) {
                                          // var cantidad = totalVertical.material_levels.filter(a => a.material_level == level.level)
                                          // console.log('cantidad', cantidad)
                                          // sumaLateral = cantidad[indexVertical].material_qty + cantidad[indexVertical].material_qty

                                          // console.log('sumaLateral', sumaLateral) 
                                          // ----------------- total cantidad lateral ---------------
                                          // var cant = cantidad.reduce((a, b) => a + b.material_qty, 0)
                                        // }

                                    })}
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>
                                      183
                                    </TableCell>
                                  </TableRow> */}
                                </Table>
                              </TableContainer>
                            </Item>
                          </Grid>

                          <Grid item xs={2}>
                            <Item>
                              <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
                                  <TableHead>
                                    <TableRow style={{ background: '#bbe6fb' }}>
                                      <TableCell>TOTAL</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow style={{ background: '#bbe6fb' }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      {familia?.family_materials.map((totalLateral) => {

                                        const detailLevel = totalLateral.material_levels.find(a => a.material_level == level.level)
                                        if (detailLevel) {
                                          var cantidad = totalLateral.material_levels.filter(a => a.material_level == level.level)
                                          // ----------------- total cantidad lateral ---------------
                                          var cant = cantidad.reduce((a, b) => a + b.material_qty, 0)
                                        }
                                        return (<TableRow
                                          style={{ background: '#bbe6fb' }}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell component="th" scope="row">{cant}</TableCell>
                                        </TableRow>
                                        )
                                      })}
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Item>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Box>
                );
              })}
            </div>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default SamplePage;
