//REACT IMPORTS
import { useState} from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { useForm } from 'react-hook-form';


import {UploadOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, Grid, Typography } from '@mui/material'
import ButtonComponent from 'components/main_components/button_component/index';
import { downloadTemplate, uploadFile } from '../providers_services/providers_service';
import { dispatch } from 'store/index';

const ProvidersUpload = (props) => {
    const { open, closeUpload } = props;
    const [name, setName] = useState('');
    // REACT-HOOK-FORM USES
    const { register, handleSubmit } = useForm({});

    const handleTemplate = () => {
        downloadTemplate();
    }
    const onChange = (e) => {
        var files = e.target.files[0].name;
        setName(files);
      }
    const onSubmit= (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.file[0]);
        //console.log(bodyFormData);
        dispatch(uploadFile(bodyFormData));
    }

    /*const uploadFile = (data) => {
        console.log(data);
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.file);
        console.log(bodyFormData);
        //dispatch(uploadFile(bodyFormData));
    }*/

    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}><Box sx={{ display: 'flex', flexDirection: 'row' }}><Box>Carga Masiva de documentos</Box><Box sx={{marginLeft: '20px'}}><ButtonComponent onClick={() => {handleTemplate()}} variant="contained" color="warning"><DownloadOutlined />&nbsp;&nbsp;Modelo de carga</ButtonComponent></Box></Box></DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                <Grid container spacing={3}>
            <Grid item xs={12}>
            <h3>Condiciones archivo de carga</h3>
                    <ul>
                        <li>Los campos marcados en rojo son obligatorios.</li>
                        <li><b>RUT: </b> Sin puntos ni guión.</li>
                    </ul>

            </Grid>
            <Grid item xs={6}>

            </Grid>
            </Grid>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { m: -1, width: '25ch' },
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                        }}
                        noValidate
                    >
                        <Button startIcon={<UploadOutlined />} variant="contained" component="label" sx={{ borderRadius: '14px', borderColor: 'success', border: 2 }}>
                            Buscar archivo
                        <input {...register("file")} style={{display: 'none'}} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" onChange={onChange} />
                        </Button>
                        <Typography variant="h5" color="primary" sx={{textAlign: 'center'}} >{name}</Typography>  
                        
                        
                    </Box>
                </DialogContent>
                <DialogActions>
                    <ButtonComponent type="Submit" variant="contained" color="success">Cargar</ButtonComponent>
                    <ButtonComponent onClick={closeUpload} variant="contained" color="error">Cerrar</ButtonComponent>
                </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default ProvidersUpload;