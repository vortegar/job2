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

// REDUCERS
import { editUser, restoreUser } from '../users_slices/users_slice';

// AXIOS METHODS IMPORTS
import { postData, resetPassword, updateData } from '../users_services/users_services';
import { restoreFamily } from 'pages/families/families_slices.js/families_slice';



const UsersForm = (props) => {
    const dispatch = useDispatch();

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

    // YUP SCHEME SETUP
    const validationSchema = yup.object({
        first_name: yup.string().required("Nombre es necesario").min(3, "Titulo no puede tener menos de 3 caracteres"),
        last_name: yup.string().required("Apellido es necesario"),
        email: yup.string().email("Debe ingresar un correo valido").required("Correo es necesario"),
        // password: yup.string().required("Contraseña es necesario"),
        rut: yup.string().required("Rut es necesario"),
    });

    const resolver = useYupValidationResolver(validationSchema);

    // VATIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeModal, user, id } = props;

    // REACT-HOOK-FORM USES
    const { handleSubmit, formState: { errors }, control } = useForm({ resolver });


    // STORE STATES IMPORTS
    const isNew = useSelector(store => store.usersStates.isNew);

    // MODAL CLOSING FUNCTION 
    const handleClose = () => {
        closeModal();
    };

    //user_types data

    const types = [
        { id: 1, label: 'Administrador' },
        { id: 2, label: 'Cubicador' },
        { id: 3, label: 'Supervisor' },
    ]
    const generateUserTypeOptions = () => {
        return types.map((type) => {
            return (
                <MenuItem key={type.id} value={type.id}>
                    {type.label}
                </MenuItem>
            );
        });
    };

    const handleAdd = (data) => {
        dispatch(restoreUser())
        postData(data);
        closeModal();
    }

    const handleMod = (id, data) => {
        updateData(id, data);
        dispatch(editUser({
            id: props.id,
            name: data.name,
            last_name: data.last_name,
            rut: data.rut,
            email: data.email,
            password: data.password,
        }));
        closeModal();
    }

    return (
        <div>
            <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>{isNew ? 'Nuevo Usuario' : 'Editar'}</DialogTitle>
                <DialogTitle  >{isNew ? 'Ingresa los datos para poder ingresar Usuario' : 'Ingresa los datos nuevos para editar el Usuario'}</DialogTitle>
                <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => {
                    isNew ? handleAdd(data) : handleMod(id, data)
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
                            <Controller name="first_name" control={control} defaultValue={isNew ? '' : user[0].first_name}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="first_name" label="Nombre" type="text" defaultValue={isNew ? value : user[0].first_name} onChange={onChange} error={!!formState.errors?.first_name} helperText={formState.errors?.first_name?.message} />
                                )}
                            />
                            <Controller name="last_name" control={control} defaultValue={isNew ? '' : user[0].last_name}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="last_name" label="Apellido" type="text" defaultValue={isNew ? value : user[0].last_name} onChange={onChange} error={!!formState.errors?.last_name} helperText={formState.errors?.last_name?.message} />
                                )}
                            />
                            <Controller name="rut" control={control} defaultValue={isNew ? '' : user[0].rut}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="rut" label="Rut" type="text" defaultValue={isNew ? value : user[0].rut} onChange={onChange} error={!!formState.errors?.rut} helperText={formState.errors?.rut?.message} />
                                )}
                            />
                            <Controller name="email" control={control} defaultValue={isNew ? '' : user[0].email}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="email" label="Correo" type="text" defaultValue={isNew ? value : user[0].email} onChange={onChange} error={!!formState.errors?.email} helperText={formState.errors?.email?.message} />
                                )}
                            />
                        </Box>
                        <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                            <Controller
                                control={control}
                                name="group"
                                defaultValue={isNew ? '' : user[0].groups[0].id}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl sx={{ display: 'inline-flex', width: 620, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                        <InputLabel>Tipo de Usuario</InputLabel>
                                        <Select onChange={onChange} value={value || ''} autowidth='true'
                                            sx={{ display: 'inline-flex', flexGrow: 1 }}
                                        >
                                            {generateUserTypeOptions()}
                                        </Select>
                                    </FormControl>
                                )}
                            />
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

UsersForm.propTypes = {
    abrir: PropTypes.bool,
    closeModal: PropTypes.func,
    id: PropTypes.string,
    user: PropTypes.array,
}


export default UsersForm;