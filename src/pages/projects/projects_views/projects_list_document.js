//REACT IMPORTS
import { useRef, useState } from 'react';

import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';

import { Controller, useForm } from 'react-hook-form';

import { DataGrid } from '@mui/x-data-grid';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setOpenView } from '../projects_slices/projects_states';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

import { CloudUploadOutlined, StopOutlined, FilePdfOutlined, FileSearchOutlined } from '@ant-design/icons';

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { withStyles } from '@material-ui/core/styles';

const StyledTextField = withStyles({
  root: {
    '& label': {
      transformOrigin: 'top right',
      right: '0',
      left: 'auto'
    }
  }
})(TextField);

// http Axios
import { uploadFile, listFileProject } from '../projects_services/projects_service';

const ListDocuments = (props) => {
  const dispatch = useDispatch();
  const { abrir, id } = props;

  const actualBtnRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const dataTable = useSelector((store) => store.projects.listFile);

  const handleClose = () => {
    dispatch(setOpenView(false));
  };

  const notify = () => toast.success('Documento cargado exitomamente');

  const onSubmit = (data) => {
    let bodyFormData = new FormData();
    bodyFormData.append('filename', data.filename);
    bodyFormData.append('data_sheet', id);
    bodyFormData.append('file', data.file[0]);
    //console.log(bodyFormData);
    dispatch(uploadFile(bodyFormData, id));
    dispatch(listFileProject(id));
    notify();
    reset();
  };

  // YUP SCHEME SETUP
  const validationSchema = yup.object({
    filename: yup.string().required('Requiere nombre archivo'),
    file: yup.mixed().required('Requiere archivo')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const TableItems = () => {
    return (
      <>
        <TableContainer align="center" style={{ width: 730 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Visualizar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable.map((row) => (
                <TableRow key={row.created_at} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.filename}</TableCell>
                  <TableCell align="center">{row.created_at}</TableCell>

                  <TableCell align="center">
                    <ButtonComponent
                      onClick={() => {
                        window.open(row.file);
                      }}
                      variant="contained"
                      color={'success'}
                    >
                      <FilePdfOutlined />
                    </ButtonComponent>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
      </>
    );
  };

  const columns = [
    { field: 'filename', headerName: 'Nombre', width: 230, headerAlign: 'center', align: 'center' },
    { field: 'created_at', headerName: 'Fecha', width: 230, headerAlign: 'center', align: 'center' },
    {
      field: 'file',
      headerName: 'Vizualizar',
      width: 230,
      headerAlign: 'center',
      align: 'center',
      flex: 0.6,
      renderCell: (params) => (
        <ButtonComponent
          onClick={() => {
            window.open(params.row.file);
          }}
          variant="contained"
          color={'success'}
        >
          <FilePdfOutlined />
        </ButtonComponent>
      )
    }
  ];

  const search = () => {
    const filter =  dataTable.filter(a => a.filename.indexOf(event.target.value) >= 0 );
    return console.log('filter', filter)
  };

  const GridDataTable = () => {
    return (
      <div
        style={{ height: 380, width: '100%' }}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main'
          }
        }}
      >
        <StyledTextField style={{ width: '200px', marginLeft: '500px' }} onChange={search} label="Busqueda" variant="standard" />
        <br />
        <br />
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell': { borderBottom: '1px solid rgb(175 175 175)' },
            '& .MuiDataGrid-columnHeader': { borderBottom: '1px solid rgb(175 175 175)' },
            '& .MuiDataGrid-iconSeparator': { color: '#afafaf' }
          }}
          style={{
            border: '1px solid rgb(175 175 175)',
            borderBottom: '1px solid rgb(175 175 175)'
          }}
          rows={dataTable}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    );
  };

  return (
    <div>
      <Dialog open={abrir} onClose={handleClose} sx={{ '& .MuiPaper-root': { borderRadius: '14px', width: 800 } }}>
        <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}> Listado documentos </DialogTitle>
        <form
          sx={{ m: 1, minWidth: 2120 }}
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <DialogContent style={{ height: '490px' }}>
            <Box
              sx={{
                '& .MuiTextField-root': { m: -1, width: '65ch' },
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                flexDirection: 'column'
              }}
              noValidate
            >
              <GridDataTable />
              {/* <TableItems/> */}
            </Box>
          </DialogContent>
          <DialogActions>
            <label htmlFor="actual-btn">
              <FileSearchOutlined style={{ fontSize: '25px', marginRight: '14px', color: 'blue' }} />
            </label>
            <input
              type="file"
              id="actual-btn"
              hidden
              ref={actualBtnRef}
              onChange={() => {
                setFileName(actualBtnRef.current.files[0].name);
                setValue('filename', actualBtnRef.current.files[0].name.split('.', 1));
                setValue('file', actualBtnRef.current.files);
              }}
            />
            {/* <span id="file-chosen">{fileName}</span> */}
            <TextField
              type="text"
              label="Nombre"
              {...register('filename')}
              required
              inputRef={(input) => {
                if (input != null) {
                  input.focus();
                }
              }}
            />{' '}
            &nbsp; &nbsp; &nbsp; &nbsp;
            <ButtonComponent type="submit" variant="contained" color={'info'}>
              <CloudUploadOutlined />
            </ButtonComponent>
            <ButtonComponent onClick={handleClose} variant="contained" color="error">
              <StopOutlined />
            </ButtonComponent>
          </DialogActions>
        </form>
        <ToastContainer />
      </Dialog>
    </div>
  );
};

export default ListDocuments;
