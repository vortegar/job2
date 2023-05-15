//REACT IMPORTS
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form'

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

// SERVICE IMPORTS
import { getFamilyData } from 'pages/families/families_services/families_service';

// SLICE IMPORTS
import { setFamilyFilter } from '../subFamilies_slices.js/subFamilies_filters';
import { restoreSubFamily } from '../subFamilies_slices.js/subFamilies_slice';
import { getSubFamilyData } from '../subFamilies_services/subFamilies_services';

const SubFamiliesFilters = (props) => {
    const dispatch = useDispatch();

    // VARIABLE ASSIGNATION OF PROPS
    const { abrir, closeFilter } = props;

    // REACT-HOOK-FORM USES
    const { handleSubmit, formState: { errors }, control } = useForm();

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

    // MODAL CLOSING FUNCTION 
    const handleClose = () => {
        closeFilter();
        getSubFamilyData(dispatch);
    };

    const filters = useSelector(store => store.SubFamiliesFilters);


    const handleFilter = (data) => {
        dispatch(setFamilyFilter(data.material_family));

        dispatch(restoreSubFamily());

        getSubFamilyData(dispatch, filters);
        closeFilter();
    }

    return (
        <div>
            <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>Filtros de Sub Familia</DialogTitle>
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
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="material_family"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Familia</InputLabel>
                                            <Select onChange={onChange} value={value} autowidth='true'
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
                        <ButtonComponent type="Submit" variant="contained" color="success" >Filtrar</ButtonComponent>
                        <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default SubFamiliesFilters;