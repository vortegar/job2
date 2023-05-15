//REACT IMPORTS
import { useCallback } from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import TextFieldComponent from '../../../components/main_components/textfield_component/index';

// STATES IMPORTS 
import { getCommuneData, getProvidersData, getProvinceData, getRegionData, postData, updateData } from '../providers_services/providers_service';


const ProvidersForm = (props) => {
    const dispatch = useDispatch();

    const filters = useSelector(store => store.providersFilters);

    // YUP SETUP
    const useYupValidationResolver = validationSchema =>
        useCallback(
            async data => {
                try {
                    const values = await validationSchema.validate(data, {
                        abortEarly: false
                    });

                    return {
                        values,
                        errors: {}
                    };
                } catch (errors) {
                    return {
                        values: {},
                        errors: errors.inner.reduce(
                            (allErrors, currentError) => ({
                                ...allErrors,
                                [currentError.path]: {
                                    type: currentError.type ?? "validation",
                                    message: currentError.message
                                }
                            }),
                            {}
                        )
                    };
                }
            },
            [validationSchema]
        );

    const validationSchema = yup.object({
        name: yup.string().required("Nombre es necesario para ingresar Proveedor").min(3, "Nombre no puede tener menos de 3 caracteres"),
        social_reason: yup.string().required("Ingresar Razon Social"),
        rut: yup.string().required("Ingresar RUT"),
        address: yup.string().required("Ingresar Direccion"),
        phone: yup.string().required("Ingresar numero de proveedor"),
        seller_full_name: yup.string().required("Ingresar nombre de vendedor"),
        seller_email: yup.string().email("Debe ingresar un correo valido").required("Ingresar Correo"),
    });

    const resolver = useYupValidationResolver(validationSchema);

    // VATIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeModal, provider, id } = props;



    // REACT-HOOK-FORM USES
    const { handleSubmit, formState: { errors }, control } = useForm({ resolver });


    // STORE STATES IMPORTS
    const isNew = useSelector(store => store.providersStates.isNew);

    // DATA ASSIGN TO COMBOBOX
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
    const specialitiess = useSelector((store) => store.specialities.listSpecialities)
    //console.log('especialidad' ,specialitiess)
    const generateSpecialityOptions = () => {
        return specialitiess[0]?.map((speciality) => {
            return (
                <MenuItem key={speciality.id} value={speciality.id}>
                    {speciality.name}
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
        closeModal();
    };

    // ADD DATA TO API
    const handleAdd = (data) => {
        postData(data)
        closeModal();
    }

    // ADD DATA TO STORE AND API
    const handleMod = (data) => {
        updateData(id, data);
        getProvidersData(dispatch, id, filters);
        closeModal();
    }


    return (
        <div>
            <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>{isNew ? 'Nuevo Proveedor' : 'Editar'}</DialogTitle>
                <DialogTitle  >{isNew ? 'Ingresa los datos para poder ingresar el Proveedor' : 'Ingresa los datos nuevos para editar el Proveedor'}</DialogTitle>
                <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => {
                    isNew ? handleAdd(data) : handleMod(data)
                })}>

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
                            <DialogTitle sx={{ fontSize: 13, fontFamily: 'Roboto', fontWeight: 'bold' }}>Datos de proveedor</DialogTitle>
                            <Box sx={{
                                '& .MuiTextField-root': { m: -1, width: '25ch' },
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                            }}>
                                <Controller name="name" control={control} defaultValue={isNew ? '' : provider[0].name}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={isNew ? value : provider[0].name} onChange={onChange} error={!!formState.errors?.name} helperText={formState.errors?.name?.message} />
                                    )}
                                />
                                <Controller name="social_reason" control={control} defaultValue={isNew ? '' : provider[0].social_reason}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="social_reason" label="Razon Social" type="text" defaultValue={isNew ? value : provider[0].social_reason} onChange={onChange} error={!!formState.errors?.social_reason} helperText={formState.errors?.social_reason?.message} />
                                    )}
                                />
                                <Controller name="rut" control={control} defaultValue={isNew ? '' : provider[0].rut}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="rut" label="Rut" type="text" defaultValue={isNew ? value : provider[0].rut} onChange={onChange} error={!!formState.errors?.rut} helperText={formState.errors?.rut?.message} />
                                    )}
                                />
                                <Controller name="address" control={control} defaultValue={isNew ? '' : provider[0].address}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="address" label="Direccion" type="text" defaultValue={isNew ? value : provider[0].address} onChange={onChange} error={!!formState.errors?.address} helperText={formState.errors?.address?.message} />
                                    )}
                                />
                                <Controller name="extra_address" control={control} defaultValue={isNew ? '' : provider[0].extra_address}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="extra_address" label="Direccion extra" type="text" defaultValue={isNew ? value : provider[0].extra_address} onChange={onChange} error={!!formState.errors?.extra_address} helperText={formState.errors?.extra_address?.message} />
                                    )}
                                />
                                <Controller name="phone" control={control} defaultValue={isNew ? '' : provider[0].phone}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="phone" label="Telefono" type="text" defaultValue={isNew ? value : provider[0].phone} onChange={onChange} error={!!formState.errors?.phone} helperText={formState.errors?.phone?.message} />
                                    )}
                                />
                                <Controller name="seller_full_name" control={control} defaultValue={isNew ? '' : provider[0].seller_full_name}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="seller_full_name" label="Nombre vendedor" type="text" defaultValue={isNew ? value : provider[0].seller_full_name} onChange={onChange} error={!!formState.errors?.seller_full_name} helperText={formState.errors?.seller_full_name?.message} />
                                    )}
                                />
                                <Controller name="seller_email" control={control} defaultValue={isNew ? '' : provider[0].seller_email}
                                    render={({ field: { onChange, value }, formState }) => (
                                        <TextFieldComponent id="seller_email" label="Email Vendedor" type="text" defaultValue={isNew ? value : provider[0].seller_email} onChange={onChange} error={!!formState.errors?.seller_email} helperText={formState.errors?.seller_email?.message} />
                                    )}
                                />
                            </Box>
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
                                        defaultValue={isNew ? '' : provider[0].speciality_id}
                                        render={({ field: { onChange, value } }) => (
                                            <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                                <InputLabel>Especialidad</InputLabel>
                                                <Select onChange={onChange} value={value} autowidth='true'
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
                                        defaultValue={isNew ? '' : provider[0].product_type_id}
                                        render={({ field: { onChange, value } }) => (
                                            <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                                <InputLabel>Tipo de Producto</InputLabel>
                                                <Select onChange={onChange} value={value} autowidth='true'
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
                                        defaultValue={isNew ? '' : provider[0].payment_method_id}
                                        render={({ field: { onChange, value } }) => (
                                            <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                                <InputLabel>Metodo de Pago</InputLabel>
                                                <Select onChange={onChange} value={value} autowidth='true'
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
                                        defaultValue={isNew ? '' : provider[0].region_id}
                                        render={({ field: { onChange, value = isNew ? value : provider[0].region_id } }) => (
                                            <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                                <InputLabel>Region</InputLabel>
                                                <Select onChange={onChange} value={value} autowidth='true'
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
                                        defaultValue={isNew ? '' : provider[0].province_id}
                                        render={({ field: { onChange, value } }) => (
                                            <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                                <InputLabel>Provincia</InputLabel>
                                                <Select onChange={onChange} value={value} autowidth='true'
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
                                        defaultValue={isNew ? '' : provider[0].commune_id}
                                        render={({ field: { onChange, value } }) => (
                                            <FormControl sx={{ display: 'inline-flex', width: 170, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                                <InputLabel>Comuna</InputLabel>
                                                <Select onChange={onChange} value={value} autowidth='true'
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
                        <ButtonComponent type="Submit" variant="contained" color="success" > {isNew ? 'Agregar' : 'Modificar'}</ButtonComponent>
                        <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )

}

ProvidersForm.propTypes = {
    abrir: PropTypes.bool,
    closeModal: PropTypes.func,
    id: PropTypes.string,
    provider: PropTypes.array,
}


export default ProvidersForm;