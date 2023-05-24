//REACT IMPORTS
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form';

// AXIOS METHODS IMPORTS
import { getFamilyData } from 'pages/families/families_services/families_service';
// import { getSubFamilyData } from 'pages/sub_families/subFamilies_services/subFamilies_services';
import { getMaterialData, postData, updateData } from '../materials_services/materials_service';


// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import { setFamilyFilter, setSubFamilyFilter } from '../materials_slices/materials_filter';
import { restoreMaterial } from '../materials_slices/materials_slice';

const MaterialsFilters = ({ abrir, closeFilter,  increment }) => {
    
    const dispatch = useDispatch();
    const filters = useSelector(store => store.MaterialsFilters);
    //! Este codigo no se usa
    // IMPORT DATA FROM API
    // useEffect(() => {
        // getFamilyData(dispatch);
        // getSubFamilyData(dispatch);
        // console.log('hola')
    // }, [])
//  useEffect(() => {

    // REACT-HOOK-FORM USES
    const { handleSubmit, formState: { errors }, control } = useForm();

    // DATA ASSIGN TO COMBOBOX
    const families = useSelector(store => store.families);
    const subFamilies = useSelector(store => store.subFamilies);

    const generateFamilyOptions = () => {
        return families.map((family) => {
            return (
                <MenuItem key={family.id} value={family.id}>
                    {family.name}
                </MenuItem>
            );
        });
    }

    const generateSubFamilyOptions = () => {
        return subFamilies.map((subFamily) => {
            return (
                <MenuItem key={subFamily.id} value={subFamily.id}>
                    {subFamily.name}
                </MenuItem>
            );
        });
    }

    const handleClose = () => {
        closeFilter();
        // getMaterialData(dispatch);
    };


    const handleFilter = (data) => {
        const deleteId= "";
        dispatch(setFamilyFilter(data.material_family));
        dispatch(setSubFamilyFilter(data.material_subfamily));
        dispatch(restoreMaterial());
        setTimeout(() => {
            console.log('cargado')
            // getMaterialData(dispatch, deleteId, filters);
            // getMaterialData( dispatch, deleteId, filters, setRowsLoading, limitPage, setCountSubfamily, countSubfamily, setCountFamily, countFamily );
        }, 1000)
        
        closeFilter();
    };

    return (
    <div>
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
                                    name="material_family"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 250, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
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
                            <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                                <Controller
                                    control={control}
                                    name="material_subfamily"
                                    defaultValue={''}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl sx={{ display: 'inline-flex', width: 250, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel>Sub Familia</InputLabel>
                                            <Select onChange={onChange} value={value} autowidth='true'
                                                sx={{ display: 'inline-flex', flexGrow: 1 }}
                                            >
                                                {generateSubFamilyOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box>
                            
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <ButtonComponent 
                        type="Submit" 
                        // onClick={increment} 
                        variant="contained" 
                        color="success" 
                    >Filtrar</ButtonComponent>
                    <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
                </DialogActions>
            </form>
        </Dialog>
    </div>
    )

}

export default MaterialsFilters;