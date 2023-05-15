//REACT IMPORTS
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import TextFieldComponent from '../../../components/main_components/textfield_component/index';

// STATES IMPORTS
import { editMaterial } from 'pages/materials/materials_slices/materials_slice';
import { setDisabledButton } from 'pages/materials/materials_slices/materials_states';

// AXIOS METHODS IMPORTS
import { getUserCubicatorData, getUserSupervisorData } from '../cubage_services/cubage_service';
import { postCubage } from '../cubage_services/cubage_form_services';
import { restoreCubageProject } from '../cubage_slices/full_cubage_sections/cubageProjects_slice';

const CubageAddForm = (props) => {
    const dispatch = useDispatch();


    // VARIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeModal, pid } = props;


    // IMPORT DATA FROM API
    useEffect(() => {
        //getDataSheetData(dispatch);
        getUserCubicatorData(dispatch);
        getUserSupervisorData(dispatch);
    }, []);

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
    });
    const resolver = useYupValidationResolver(validationSchema);


    // REACT-HOOK-FORMS USES
    const { handleSubmit, formState: { errors }, control } = useForm({resolver });

    // DATA ASSIGN TO COMBOBOX

    //cubicator assign
    const cubicators = useSelector(store => store.cubicatorUsers);
    const generateCubicatorOptions = () => {
        return cubicators.map((user) => {
            return (
                <MenuItem key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                </MenuItem>
            );
        });
    }

    //supervisor assign
    const supervisors = useSelector(store => store.supervisorUsers);
    const generateSupervisorOptions = () => {
        return supervisors.map((user) => {
            return (
                <MenuItem key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                </MenuItem>
            );
        });
    }

    // datasheet assign
    const data_sheets = useSelector(store => store.projects.list);
    const generateDataSheetOptions = () => {
        return data_sheets.map((data) => {
            //console.log(data);
            return (
                <MenuItem key={data.id} value={data.id}>
                    {data.project_title}
                </MenuItem>
            )
        })
    }


    // MODAL CLOSING FUNCTION
    const handleClose = () => {
        closeModal();
    };

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let currentDate = `${year}-${month}-${date}`

    // ADD PRODUCT TO THE STORE FUNCTION
    const handleAdd = (data, pid) => {
        closeModal();
        dispatch(restoreCubageProject())
        postCubage(data, pid, currentDate);
    };


    return (
        <div>
            <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>Agregar actividad</DialogTitle>
                <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => { handleAdd(data, pid) })}>
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
                            <Controller name="activity" control={control}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="activity" label="Actividad" type="text" onChange={onChange} />//error={!!formState.errors?.name} helperText={formState.errors?.name?.message} 
                                )}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <ButtonComponent type="Submit" variant="contained" color="success" >Agregar</ButtonComponent>
                        <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default CubageAddForm;