import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EllipsisOutlined } from '@ant-design/icons';
import { IconButton } from '../../../../../node_modules/@mui/material/index';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1', 159, 6, 3, 18),
  createData('1', 159, 6, 3, 18),
  createData('1', 159, 6, 3, 18),
  createData('1', 159, 6, 3, 18)
];

export default function DenseTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Nº</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Costo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.protein}</TableCell>
              <TableCell>
                <IconButton sx={{ color: 'black', borderRadius: '50%' }}>
                  <EllipsisOutlined />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
