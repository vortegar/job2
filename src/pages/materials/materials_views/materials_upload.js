import Register from "pages/authentication/Register";
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "../../../../node_modules/@mui/material/index";
import { useForm } from 'react-hook-form';
import { downloadTemplate, uploadFile } from "../materials_services/materials_service";
import { EditOutlined, DeleteOutlined, CloseCircleOutlined, AppstoreAddOutlined, FilterOutlined, UndoOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ButtonComponent from "components/main_components/button_component/index";
import { useDispatch } from 'react-redux';
// import { useDispatch } from "../../../../node_modules/react-redux/es/exports";



export const MaterialsUpload = (props) => {
    const { open, closeUpload } = props;


    //REACT-HOOK-FORMS USES
    const { register, handleSubmit } = useForm({}); 
    const dispatch = useDispatch();

    const onSubmit= (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.file[0]);
        dispatch(uploadFile(bodyFormData));
    }


    const handleTemplate = () => {
        downloadTemplate();
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}><Box sx={{ display: 'flex', flexDirection: 'row' }}><Box>Carga Masiva de documentos</Box><Box><Button onClick={() => { handleTemplate() }}><InfoCircleOutlined /></Button></Box></Box></DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
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
                            <Button variant="contained" component="label" sx={{ borderRadius: '14px', borderColor: 'success', border: 2 }}>
                                <input {...register("file")} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" />
                            </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <ButtonComponent type="Submit" variant="contained" color="success">Cargar</ButtonComponent>
                        <ButtonComponent onClick={closeUpload} variant="contained" color="error">Cerrar</ButtonComponent>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
