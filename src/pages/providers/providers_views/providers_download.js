//REACT IMPORTS
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { ExclamationCircleOutlined } from '@ant-design/icons';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import { getRegionData, getProvinceData, getCommuneData, downladReport } from '../providers_services/providers_service';

const ProvidersDownload = (props) => {
    const dispatch = useDispatch();

    // VATIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeDownload } = props;

    // REACT-HOOK-FORM USES
    const { handleSubmit, formState: { errors }, control } = useForm();


    //DATA ASSIGN TO COMBOBOX
    //region data
    const regions = useSelector(store => store.regions);

    const generateRegionOptions = () => {
        return regions.map((region) => {
            return (
                <MenuItem key={region.id} value={region.id}>
                    {region.name}
                </MenuItem>
            );
        });
    }

    //province data
    const provinces = useSelector(store => store.provinces);

    const generateProvinceOptions = () => {
        return provinces.map((province) => {
            return (
                <MenuItem key={province.id} value={province.id}>
                    {province.name}
                </MenuItem>
            );
        });
    }

    //commune data
    const communes = useSelector(store => store.communes);

    const generateCommuneOptions = () => {
        return communes.map((commune) => {
            return (
                <MenuItem key={commune.id} value={commune.id}>
                    {commune.name}
                </MenuItem>
            );
        });
    }

    //specilaity data
    const specialities = [
        { id: 1, label: 'Electricidad' },
        { id: 2, label: 'Ferretería' },
        { id: 3, label: 'Rótulos Tableros' }
    ]
    const generateSpecialityOptions = () => {
        return specialities.map((speciality) => {
            return (
                <MenuItem key={speciality.id} value={speciality.id}>
                    {speciality.label}
                </MenuItem>
            );
        });
    };


    //product_type data
    const types = [
        { id: 1, label: 'Accesorios Eléctricos' },
        { id: 2, label: 'Acrílicos Tableros' },
        { id: 3, label: 'Artefactos' }
    ]
    const generateProductTypeOptions = () => {
        return types.map((type) => {
            return (
                <MenuItem key={type.id} value={type.id}>
                    {type.label}
                </MenuItem>
            );
        });
    };

    //payment_method data

    const methods = [
        { id: 1, label: '50 % anticipo - Cheque a 30 contra entrega' },
        { id: 2, label: 'Cheque a 30 dias' },
        { id: 3, label: 'Cheque a 60 dias' }
    ]
    const generatePaymentMethodOptions = () => {
        return methods.map((method) => {
            return (
                <MenuItem key={method.id} value={method.id}>
                    {method.label}
                </MenuItem>
            );
        });
    };

    // MODAL CLOSING FUNCTION 
    const handleClose = () => {
        closeDownload();
    };

    const handleDownload = (data) => {
        downladReport(data);
        closeDownload();
    };

    return (<div>
        <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
            <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold', display: 'flex' , flexGrow: 1, width: '100%' }}><Box sx={{ justifyContent: 'space-between', display: 'flex', width: 700, flexGrow: 1 }}><Box>Descarga de Excel</Box><Box><ButtonComponent><ExclamationCircleOutlined /></ButtonComponent></Box></Box></DialogTitle>
            <DialogTitle sx={{ fontSize: 17, fontFamily: 'Roboto', fontWeight: '' }}>Ingrese los filtros con los que desea descargar el reporte<br />dejar los campos vacios genera un reporte de todos los datos</DialogTitle>
            <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => { handleDownload(data) })}>
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
                        <DialogTitle sx={{ fontSize: 13, fontFamily: 'Roboto', fontWeight: 'bold' }}>Datos de producto</DialogTitle>
                        <Box sx={{
                            '& .MuiTextField-root': { m: -1, width: '25ch' },
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}>

                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="speciality"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Especialidad</InputLabel>
                                            <Select onChange={onChange} value={value || ''} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generateSpecialityOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box>
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="product_type"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Tipo de Producto</InputLabel>
                                            <Select onChange={onChange} value={value || ''} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generateProductTypeOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box>
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="payment_method"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Metodo de Pago</InputLabel>
                                            <Select onChange={onChange} value={value || ''} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generatePaymentMethodOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box>


                        </Box>

                        <DialogTitle sx={{ fontSize: 13, fontFamily: 'Roboto', fontWeight: 'bold' }}>Datos de locación</DialogTitle>


                        <Box sx={{
                            '& .MuiTextField-root': { m: -1, width: '25ch' },
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}>
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="region"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Region</InputLabel>
                                            <Select onChange={onChange} value={value || ''} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generateRegionOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box>
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="province"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Provincia</InputLabel>
                                            <Select onChange={onChange} value={value || ''} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generateProvinceOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box>
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="commune"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Comuna</InputLabel>
                                            <Select onChange={onChange} value={value || ''} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generateCommuneOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box>


                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <ButtonComponent type="Submit" variant="contained" color="success" >Descargar</ButtonComponent>
                    <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
                </DialogActions>
            </form>
        </Dialog>
    </div>
    )

}

export default ProvidersDownload;