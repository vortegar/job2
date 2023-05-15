//REACT IMPORTS
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import TextFieldComponent from '../../../components/main_components/textfield_component/index';

// STATES IMPORTS
import { getFamilyData, postData, updateData } from '../families_services/families_service';
import { restoreFamily } from '../families_slices.js/families_slice';


const FamiliesForm = (props) => {
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
        name: yup.string().required("Nombre es necesario para ingresar Familia").min(3, "Titulo no puede tener menos de 3 caracteres"),
        description: yup.string().required("Descripcion es necesaria para ingresar Familia"),
    });

    const resolver = useYupValidationResolver(validationSchema);

    // VARIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeModal, id, product } = props;

    // REACT-HOOK-FORMS USES
    const { handleSubmit, formState: { errors }, control } = useForm({ resolver });

    // STORE STATES IMPORTS
    const isNew = useSelector(store => store.familiesStates.isNew);


    // MODAL CLOSING FUNCTION
    const handleClose = () => {
        closeModal();
    };

    // ADD PRODUCT TO THE STORE FUNCTION
    const handleAdd = (data) => {
        dispatch(restoreFamily)
        postData(data)
        closeModal();
    };

    // MODIFIES A FAMILIES FROM THE STORE FUNCTION
    const handleMod = (id, data) => {
        updateData(id, data);
        getFamilyData(dispatch, id);
        closeModal();
    }

    return (
        <div>
            <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>{isNew ? 'Nueva Familia' : 'Editar'}</DialogTitle>
                <form onSubmit={handleSubmit((data) => {
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
                            <Controller name="name" control={control} defaultValue={isNew ? '' : product[0].name}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={isNew ? value : product[0].name} onChange={onChange} error={!!formState.errors?.name} helperText={formState.errors?.name?.message} />
                                )}
                            />
                            <Controller name="description" control={control} defaultValue={isNew ? '' : product[0].description}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="description" label="Descripcion" type="text" defaultValue={isNew ? value : product[0].description} onChange={onChange} error={!!formState.errors?.description} helperText={formState.errors?.description?.message} />
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

FamiliesForm.propTypes = {
    abrir: PropTypes.bool,
    closeModal: PropTypes.func,
    id: PropTypes.string,
    product: PropTypes.array
}


export default FamiliesForm