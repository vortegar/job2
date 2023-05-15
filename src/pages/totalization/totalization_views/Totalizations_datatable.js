//REACT IMPORTS

import {useEffect} from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';

import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { setOpenView } from '../projects_slices/projects_states';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

import { CloudUploadOutlined, StopOutlined, FilePdfOutlined } from '@ant-design/icons';

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

// http Axios
import { uploadFile, listFileProject } from '../projects_services/projects_service';

const FormDialog = (props) => {
  
  const dispatch = useDispatch();
  const { abrir, closeModal, id } = props;

  const dataTable = useSelector(store => store.projects.listFile);
  
  const handleClose = () => {
    dispatch(setOpenView(false));
  };

  const notify = () => toast.success("Documento cargado exitomamente");

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
  }

  // YUP SCHEME SETUP
  const validationSchema = yup.object({
    filename: yup.string().required("Requiere nombre archivo"),
    // data_sheet: yup.string().required("Requiere nombre archivo"),
    file: yup.mixed().required("Requiere archivo"),
  });

   
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });


const TableItems = ()=> {
    return (
      <>
      <TableContainer align="center" style={{ width: 730 }} component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Visualizar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row) => (
              <TableRow
                key={row.created_at}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.filename}</TableCell>
                <TableCell align="center">{row.created_at}</TableCell>

                <TableCell align="center">
                <ButtonComponent onClick={()=>{ window.open(row.file) }} variant="contained" color={"success"} ><FilePdfOutlined/></ButtonComponent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      </>
    );
  }
  
  return (
    <div>
      <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 800 } }}>
        <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}> Listado documentos </DialogTitle>
        <form sx={{ m: 1, minWidth:2120 }} onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}>
          <DialogContent >
            <Box
              sx={{
                '& .MuiTextField-root': { m: -1, width: '55ch' },
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                flexDirection: 'column',
              }}
              noValidate
            >
              <TableItems/>
            </Box>
          </DialogContent>
          <DialogActions>     
          {/* <input type="hidden" name="data_sheet" value={id} {...register("data_sheet")} /> */}
            <TextField type="text" label="Nombre"  {...register("filename")} required/>  &nbsp; &nbsp; &nbsp; &nbsp; 
            <TextField type="file" label="Archivo" {...register("file")} required/> &nbsp;  &nbsp; &nbsp; &nbsp;
            <ButtonComponent onClick={handleSubmit((data) => loadApartment(data))} variant="contained" color={"warning"} ><CloudUploadOutlined/></ButtonComponent>
            <ButtonComponent onClick={handleClose} variant="contained" color="error"><StopOutlined/></ButtonComponent>
          </DialogActions>
        </form>
        <ToastContainer />
      </Dialog>
    </div>
  );
};

export default FormDialog;