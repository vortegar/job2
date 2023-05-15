import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useDispatch, useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow:'none',
}));






const rows =[
  {id:1, codigo:'I10101', familia:'PORTALAMPARAS', unidad:'C/U', columns_1:36, columns_2:101, columns_3:550, columns_4:66, columns_5:390},
  {id:2, codigo:'I10103', familia:'FOCOS BAÑOS', unidad:'C/U', columns_1:10, columns_2:28, columns_3:150, columns_4:17, columns_5:390},
  {id:3, codigo:'I10104', familia:'FOCOS TERRAZAS', unidad:'C/U', columns_1:7, columns_2:18, columns_3:100, columns_4:66, columns_5:390},
  {id:4, codigo:'I10117', familia:'EQUIPO FLUORESCENTE LED', unidad:'C/U', columns_1:14, columns_2:75, columns_3:75, columns_4:66, columns_5:390},
  {id:5, codigo:'I10116', familia:'EXTRACTOR 220V', unidad:'C/U', columns_1:6, columns_2:22, columns_3:120, columns_4:66, columns_5:390}
]



// const totalDown = ()=>{
//   var datatotalDown =[]
//   familia?.family_materials.map((row) => (
//    data.push(row)
//   //  data.push(row.material_levels[index1][0].material_qty)
//    ))

//    console.log(datatotalDown)
// }

// level = pispo
// material_groups_material = familia
// family_materials = materiales
// material_laves = cantidad por piso

export default function DataTableGroups( ) {


  // useEffect(() => {
    
  //   //  totalDown()
    
  //   }, []);

  // const {dataDefault} = props;
  const dataDefault = useSelector((store) => store.totalization_slice.list);

  const [data, setData] = useState(dataDefault)
  
  return (
    <>
{/*     
  // level = pispo  
  // material_groups_material = familia
  // family_materials = materiales
  // material_laves = cantidad por piso */}

    <Box sx={{ flexGrow: 1 }}>

    {data?.material_group_material.map((familia, index) => {
                      return(
                        
                        <Grid container spacing={1}>
                        <Grid item xs={10}>
                          <Item>
                            <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>                 
                                  <TableRow style ={{ background : "#bbe6fb" }}>
                                    <TableCell>CODIGO</TableCell>
                                    <TableCell align="left">{familia?.material_family}</TableCell>
                                    <TableCell align="left">UNIDAD</TableCell>
                                    {familia?.family_materials[0]?.material_levels[0]?.map((dataLevel, index) => {
                                      return(
                                        <TableCell key={index} align="left">{dataLevel.material_level}</TableCell>
                                      )
                                    })}
                                  </TableRow>
                                </TableHead>
                                <TableBody>

                                  {familia?.family_materials.map((row, index1) => (
                                    <TableRow
                                      key={index1}
                                      style ={ index1 % 2? { background : "#e5f5fd" }:{ background : "white" }}
                                    >
                                      <TableCell component="th" scope="row">{row.material_code}</TableCell>
                                      <TableCell align="left">{row.material_name}</TableCell>
                                      <TableCell align="left">{row.material_measure_unit}</TableCell>
                                      <TableCell align="left">{row.material_levels[index1][0].material_qty}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                                <TableRow style ={{ background : "#bbe6fb" }}>
                                  <TableCell></TableCell>
                                  <TableCell align="left"></TableCell>
                                  <TableCell align="left" style={{fontWeight: 'bold' }}>TOTAL</TableCell>
                                  
                                  {/* {familia?.family_materials.map((total, indexTotal) => (
                                    <TableRow
                                      key={indexTotal}
                                      style ={ indexTotal % 2? { background : "#e5f5fd" }:{ background : "white" }}
                                    >
                                      <TableCell align="left">{row.material_levels[index1][0].material_qty}</TableCell>
                                    </TableRow>
                                  ))} */}

                                  
                                  {/* <TableCell align="left" style={{fontWeight: 'bold' }}>64</TableCell>
                                  <TableCell align="left" style={{fontWeight: 'bold' }}>183</TableCell>
                                  <TableCell align="left" style={{fontWeight: 'bold' }}>995</TableCell>
                                  <TableCell align="left" style={{fontWeight: 'bold' }}>120</TableCell>
                                  <TableCell align="left" style={{fontWeight: 'bold' }}>233</TableCell> */}
                                </TableRow>
                              </Table>
                            </TableContainer>
                          </Item>
                        </Grid>
                
                        <Grid item xs={2}>
                          <Item>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
                                  <TableHead>
                                    <TableRow style ={{ background : "#bbe6fb" }} >
                                      <TableCell>TOTAL</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >

                                     {familia?.family_materials.map((totalLateral, indexTotalL) => (
                                      <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                      <TableCell component="th" scope="row">{totalLateral.material_levels[indexTotalL][0].total}</TableCell>
                                    </TableRow>
                                    ))}
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                          </Item>
                        </Grid>
                
                      </Grid>
                    
                    
                    
                    
                    )
                    
                    
                    })}
  

    <Grid container spacing={1}>
        <Grid item xs={10}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>                 
                  <TableRow style ={{ background : "#bbe6fb" }}>
                    <TableCell>CODIGO</TableCell>
                    <TableCell align="left">FAMILIA CENTROS</TableCell>
                    <TableCell align="left">UNIDAD</TableCell>
                    {/* levels = piso  */}
                    {data?.levels.map((dataLevel, index) => {
                      return(
                        <TableCell key={index} align="left">{dataLevel.level}</TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      style ={ index % 2? { background : "#e5f5fd" }:{ background : "white" }}
                    >
                      <TableCell component="th" scope="row">{row.codigo}</TableCell>
                      <TableCell align="left">{row.familia}</TableCell>
                      <TableCell align="left">{row.unidad}</TableCell>
                      <TableCell align="left">{row.columns_1}</TableCell>
                      <TableCell align="left">{row.columns_2}</TableCell>
                      <TableCell align="left">{row.columns_3}</TableCell>
                      <TableCell align="left">{row.columns_4}</TableCell>
                      <TableCell align="left">{row.columns_5}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow style ={{ background : "#bbe6fb" }}>
                  <TableCell></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>TOTAL</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>64</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>183</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>995</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>120</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>233</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow style ={{ background : "#bbe6fb" }} >
                      <TableCell>TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row">2.076</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">1.143</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">307</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">202</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">267</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
          </Item>
        </Grid>

      </Grid>


      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>                 
                  <TableRow style ={{ background : "#bbe6fb" }}>
                    <TableCell>CODIGO</TableCell>
                    <TableCell align="left">FAMILIA CENTROS</TableCell>
                    <TableCell align="left">UNIDAD</TableCell>
                    {data?.levels.map((dataLevel, index) => {
                      return(
                        <TableCell key={index} align="left">{dataLevel.level}</TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      style ={ index % 2? { background : "#e5f5fd" }:{ background : "white" }}
                    >
                      <TableCell component="th" scope="row">{row.codigo}</TableCell>
                      <TableCell align="left">{row.familia}</TableCell>
                      <TableCell align="left">{row.unidad}</TableCell>
                      <TableCell align="left">{row.columns_1}</TableCell>
                      <TableCell align="left">{row.columns_2}</TableCell>
                      <TableCell align="left">{row.columns_3}</TableCell>
                      <TableCell align="left">{row.columns_4}</TableCell>
                      <TableCell align="left">{row.columns_5}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow style ={{ background : "#bbe6fb" }}>
                  <TableCell></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>TOTAL</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>64</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>183</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>995</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>120</TableCell>
                  <TableCell align="left" style={{fontWeight: 'bold' }}>233</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow style ={{ background : "#bbe6fb" }} >
                      <TableCell>TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row">2.076</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">1.143</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">307</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">202</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">267</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
          </Item>
        </Grid>

      </Grid>
    </Box>


    </>
    
  );
}