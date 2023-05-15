//REACT IMPORTS
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form';


// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

// SERVICES IMPORTS
import { getRegionData, getProvinceData, getCommuneData, getProvidersData } from '../providers_services/providers_service';
//import { getProvidersData } from "../providers_services/providers_service";

// SLICE IMPORTS
import { setSpecialityFilter, setTypeFilter, setMethodFilter, setRegionFilter, setProvinceFilter, setCommuneFilter } from '../providers_slices/providers_filters';
import { restoreProvider } from '../providers_slices/providers_slice';

const ProvidersFilters = (props) => {
    const dispatch = useDispatch();

    // VATIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeFilter } = props;
    

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
        closeFilter();
        getProvidersData(dispatch);
    };

    const filters = useSelector(store => store.providersFilters);

    const handleFilter = (data) => {
        dispatch(setSpecialityFilter(data.speciality));
        dispatch(setTypeFilter(data.product_type));
        dispatch(setMethodFilter(data.payment_method));
        dispatch(setRegionFilter(data.region));
        dispatch(setProvinceFilter(data.province));
        dispatch(setCommuneFilter(data.commune));
        dispatch(restoreProvider());
        
        getProvidersData(dispatch, filters);
        closeFilter();
    };
        

    return (<div>
        <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
            <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>Filtros de busqueda</DialogTitle>
            <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => { handleFilter(data) })}>
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
                    <ButtonComponent type="Submit" variant="contained" color="success" >Filtrar</ButtonComponent>
                    <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
                </DialogActions>
            </form>
        </Dialog>
    </div>
    )


}

export default ProvidersFilters