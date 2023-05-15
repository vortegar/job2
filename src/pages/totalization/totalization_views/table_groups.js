import * as React from 'react';
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

const rows2 =[
  {id:1, codigo:'A10101', familia:'INTERRUPTOR 9/12', unidad:'C/U', columns_1:15, columns_2:101, columns_3:550, columns_4:66, columns_5:390},
  {id:2, codigo:'A10102', familia:'INTERRUPTOR 9/15', unidad:'C/U', columns_1:10, columns_2:28, columns_3:150, columns_4:17, columns_5:390},
  {id:3, codigo:'A10103', familia:'INTERRUPTOR 9/32', unidad:'C/U', columns_1:7, columns_2:18, columns_3:100, columns_4:66, columns_5:390},
  {id:4, codigo:'A10104', familia:'INTERRUPTOR 9/24', unidad:'C/U', columns_1:12, columns_2:75, columns_3:75, columns_4:66, columns_5:390},
  {id:5, codigo:'A10105', familia:'INTERRUPTOR 9/24/12', unidad:'C/U', columns_1:2, columns_2:22, columns_3:120, columns_4:66, columns_5:390},
  {id:5, codigo:'A10106', familia:'INTERRUPTOR 9/24/15', unidad:'C/U', columns_1:3, columns_2:22, columns_3:120, columns_4:66, columns_5:390},
  {id:5, codigo:'A10107', familia:'INTERRUPTOR 9/24 DOBLE', unidad:'C/U', columns_1:5, columns_2:22, columns_3:120, columns_4:66, columns_5:390},
  {id:5, codigo:'A10112', familia:'PULSADOR', unidad:'C/U', columns_1:6, columns_2:22, columns_3:120, columns_4:66, columns_5:390},
  {id:5, codigo:'A10113', familia:'TAPA CIEGA LINEA', unidad:'C/U', columns_1:6, columns_2:22, columns_3:120, columns_4:66, columns_5:390}
]
export default function DataTableGroups() {
  return (
    <>
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>                 
                  <TableRow style ={{ background : "#bbe6fb" }}>
                    <TableCell>CODIGO</TableCell>
                    <TableCell align="left">FAMILIA CENTROS</TableCell>
                    <TableCell align="left">UNIDAD</TableCell>
                    <TableCell align="left">Piso 1</TableCell>
                    <TableCell align="left">Piso 2</TableCell>
                    <TableCell align="left">Piso 3</TableCell>
                    <TableCell align="left">Piso 4</TableCell>
                    <TableCell align="left">Piso 5</TableCell>
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

        <Grid item xs={1}>
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

        <Grid item xs={2}>
          <Item>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow style ={{ background : "#adf4b8" }}>
                      <TableCell>PERDIDA</TableCell>
                      <TableCell>TOTAL C/P</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">496</TableCell>
                      </TableRow>
                      <TableRow style ={{ background : "#ecfcf0" }}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">352</TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">361</TableCell>
                      </TableRow>
                      <TableRow style ={{ background : "#ecfcf0" }}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">45</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">14</TableCell>
                      </TableRow>
                  </TableBody>
                </Table> 
              </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </Box>


    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>                 
                  <TableRow style ={{ background : "#bbe6fb" }}>
                    <TableCell>CODIGO</TableCell>
                    <TableCell align="left">FAMILIA CENTROS</TableCell>
                    <TableCell align="left">UNIDAD</TableCell>
                    <TableCell align="left">Piso 1</TableCell>
                    <TableCell align="left">Piso 2</TableCell>
                    <TableCell align="left">Piso 3</TableCell>
                    <TableCell align="left">Piso 4</TableCell>
                    <TableCell align="left">Piso 5</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row, index) => (
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

        <Grid item xs={1}>
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
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">267</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">267</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">267</TableCell>
                    </TableRow>
                    <TableRow style ={{ background : "#bbe6fb" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">267</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow style ={{ background : "#adf4b8" }}>
                      <TableCell>PERDIDA</TableCell>
                      <TableCell>TOTAL C/P</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">496</TableCell>
                      </TableRow>
                      <TableRow style ={{ background : "#ecfcf0" }}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">352</TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">361</TableCell>
                      </TableRow>
                      <TableRow style ={{ background : "#ecfcf0" }}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">45</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">14</TableCell>
                      </TableRow>
                      <TableRow style ={{ background : "#ecfcf0" }}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">45</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">14</TableCell>
                      </TableRow>
                      <TableRow style ={{ background : "#ecfcf0" }}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">45</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row" align="center">14</TableCell>
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