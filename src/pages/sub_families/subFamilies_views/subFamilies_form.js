//REACT IMPORTS
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import TextFieldComponent from '../../../components/main_components/textfield_component/index';

// REDUCERS
import { editSubFamily } from '../subFamilies_slices.js/subFamilies_slice';

// AXIOS METHOD IMPORTS
import { postData, updateData } from '../subFamilies_services/subFamilies_services';
import { getFamilyData } from 'pages/families/families_services/families_service';


const SubFamiliesForm = (props) => {

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
        name: yup.string().required("Nombre es necesario para ingresar sub Familia").min(3, "Titulo no puede tener menos de 3 caracteres"),
        description: yup.string().required("Descripcion es necesaria para ingresar sub Familia"),
    });
    const resolver = useYupValidationResolver(validationSchema);


    // FAMILIES IMPORT
    useEffect(() => {
        getFamilyData(dispatch);
    }, [])
    
    const families = useSelector(store => store.families)

    const generateFamilyOptions = () => {
        return families.map((family) => {
            return (
                <MenuItem key={family.id} value={family.id}>
                    {family.name}
                </MenuItem>
            );
        });
    }

    // VARIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeModal, id, product } = props;

    // REACT-HOOK-FORMS USES
    const { handleSubmit, formState: { errors }, control, defaultValues } = useForm({ resolver });

    // STORE STATES IMPORTS
    const isNew = useSelector(store => store.subFamiliesStates.isNew);

    isEmpty(errors) ? '' : '';


    // MODAL CLOSING FUNCTION
    const handleClose = () => {
        closeModal();
    };

    // ADD SubFamily TO THE STORE FUNCTION
    const handleAdd = (data) => {
        postData(data);
        closeModal();
    };

    // MOD A subfamily
    const handleMod = (id, data) => {
        updateData(id, data);
        dispatch(editSubFamily({
            id: props.id,
            name: data.name,
            description: data.description,
            material_family: data.material_family,
        }));
        closeModal();
    }

    return (
        <div>
            <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>{isNew ? 'Nueva SubFamilia' : 'Edicion'}</DialogTitle>
                <DialogTitle  >{isNew ? 'Ingresa los datos para poder ingresar la sub familia' : 'Ingresa los datos nuevos para editar la sub familia'}</DialogTitle>
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
                            <Controller name="name" control={control} defaultValue={isNew ? '' : product[0].name}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={isNew ? value : product[0].name} onChange={onChange} error={!!formState.errors?.name} helperText={formState.errors?.name?.message} />
                                )}
                            />
                            <Controller name="description" control={control} defaultValue={isNew ? '' : product[0].description}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="description" label="Descripcion" type="text" values={isNew ? value : product[0].description} defaultValue={isNew ? value : product[0].description} onChange={onChange} error={!!formState.errors?.description} helperText={formState.errors?.description?.message} />
                                )}
                            />
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="material_family"
                                    defaultValue={isNew ? '' : product[0].material_family}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Familia</InputLabel>
                                            <Select onChange={onChange} value={isNew ? value : product[0].material_family} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generateFamilyOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
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
    );
};


SubFamiliesForm.propTypes = {
    abrir: PropTypes.bool,
    closeModal: PropTypes.func,
    id: PropTypes.number,
    product: PropTypes.array
}


export default SubFamiliesForm;