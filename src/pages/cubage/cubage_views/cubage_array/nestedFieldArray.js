// --------------------------- FAMILIES ARRAYS ---------------------------
// REACT IMPORTS
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useFieldArray, Controller } from "react-hook-form";

// MATERIAL UI IMPORTS
import { MinusCircleOutlined } from '@ant-design/icons';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, TableCell, TableRow, Stack } from '@mui/material';

// COMPONENTS IMPORTS
import MaterialsArray from "./materialArray";
import ButtonComponent from "components/main_components/button_component/index";



export default function Fields({ control, register, defaultValues, errors, apartmentId, handleSubmit, submitFloor, floorIndex, floorNumber, setValue, putFloor, reset, deleteFamily, familyState, familyLock, setFamilyLock }) {

    // REACT-HOOK-FORM CONFIG FOR FAMILIES ARRAY
    const { fields, append, remove } = useFieldArray({
        control, name: `floor[${floorIndex}].families`
    });

    if (familyState == false) {
        setFamilyLock(true);
      }else {
        setFamilyLock(false);
      }

    const {
        fields: apartmentFields,
        append: apartmentAppend,
        remove: apartmentRemove
    } = useFieldArray({ control, name: `floor[${floorIndex}].families.apartments` });

    const [isNew, setIsNew] = useState();

    //const familyLock = useSelector(store => store.cubageFormStates.familyLock);

    // FAMILY COMBOBOX INDEX FOR SETTING MATERIALS COMBOBOX
    const [familyCB, setFamilyCB] = useState();
    const [counter, setCounter] = useState(1);

    // GETTING DATA FROM STORE
    const rows = useSelector(store => store.cubageFloor);
    const families = useSelector(store => store.families);
    const famil = useSelector(store => store.cubageGroups);

    const identificadorPiso = rows[floorNumber];
    const filterFamil = famil.filter(e => e.cubication_section == identificadorPiso?.cubication_section)

    useEffect(() => {
        reset({ test: [] })
        if (filterFamil) {
            if (rows[floorIndex]?.isNew == false) {
                setIsNew(false);
            } else {
                setIsNew(true);
            };
        } else {
            setIsNew(true)
        }
    }, [])

    // FAMILY COMBOBOX OPTIONS
    const generateFamilyOptions = () => {
        return families.map((family) => {
            return (
                <MenuItem key={family.id} value={family.id}>
                    {family.name}
                </MenuItem>
            );
        });
    }

    // FAMILY COMBOBOX ID SET
    const handleMaterial = (e, index) => {
        setFamilyCB(e);
    };

    // GENERATE FAMILY ARRAY FIELDS FUNCTION
    useEffect(() => {
        filterFamil.map((i, index) => {
            if (filterFamil.length == 1 && i?.id != "") {
                append({});
            } else {
                if (counter < filterFamil.length) {
                    append({});
                    setCounter(counter + index);
                }
            }
        });
        reset({ test: [] })
    }, [append, famil]);

    return (
        <>
            {fields.map((item, index) => {

                const idFamilia = filterFamil[index]?.material_family?.id;
                const idDelete = famil[index]?.id;
                return (
                    <>
                        <TableRow key={item.id} style={{ 'backgroundColor': '#f5f5f5', "height": '35px' }}>
                            <TableCell sx={{ border: 1 }} >
                                <Controller
                                    control={control}
                                    name={`floor[${floorIndex}].families[${index}].material_family`}
                                    defaultValue={filterFamil[index]?.material_family?.id}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl  sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 30, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                            <InputLabel style={{ 'backgroundColor': '#f3f3f3' }}>Familia</InputLabel>
                                            <Select  
                                                onChange={onChange} 
                                                onBlur={e => handleMaterial(e.target.value, index)} 
                                                value={value} 
                                                autowidth='true' 
                                                defaultValue={filterFamil[index]?.material_family?.id}
                                                sx={{ display: 'inline-flex', width: 200 }}
                                            >
                                                {generateFamilyOptions()}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <input hidden placeholder="id" label="id"  {...register(`floor[${floorIndex}].families[${index}].familyId`, { value: filterFamil[index]?.id })} value={filterFamil[index]?.id} />
                            </TableCell>
                            {rows[floorNumber]?.apartment_groups?.map((i, indice) => {
                                return (
                                    <>
                                        <TableCell sx={{ border: 1 }} colSpan="2" key={i.id}>
                                            <TextField disabled label="Departamento" InputLabelProps={{ shrink: true, style: { color: '#000000', background: '#f3f3f3' } }} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, }, }} defaultValue={i.apartment_number}></TextField>
                                        </TableCell>
                                    </>
                                )
                            })}
                            {/*apartmentFields.map((i, indice) => {
                                const total = rows[floorNumber]?.apartment_groups[indice]?.apartment_number;

                                setValue(`floor[${floorIndex}].families[${index}].apartment`, total);

                                return (
                                <>
                                    <TableCell sx={{ border: 1 }} colSpan="2" key={i.id}>
                                        <TextField disabled label="Departamento" InputLabelProps={{ shrink: true, style: { color: '#000000', background: '#f3f3f3' } }} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, }, }} {...register(`floor[${floorIndex}].families[${index}].apartment`)}></TextField>
                                    </TableCell>
                                </>
                                )

                            })*/}
                            <TableCell sx={{ border: 1, width: 120 }}>
                            </TableCell>
                            <TableCell sx={{ border: 1 }} colSpan='100%'>
                                <Stack direction="row" justifyContent="end">
                                    {/*<ButtonComponent onClick={() => { remove(index), deleteFamily(floorNumber, floorIndex, index, idDelete) }} color='error' tooltip={`Eliminar material`}><MinusCircleOutlined /></ButtonComponent>*/}
                                    <ButtonComponent onClick={handleSubmit((data) => { deleteFamily(data, floorNumber, floorIndex, index, idDelete), remove(index) })} color='error' tooltip={`Eliminar Familia`}><MinusCircleOutlined /></ButtonComponent>


                                    {/*<ButtonComponent onClick={() => {
                                        handleSubmit((data) => {deleteFamily(data, floorNumber, floorIndex, index, idDelete)}),
                                        remove(index) 
                                    }} color='error' tooltip={`Eliminar material`}><MinusCircleOutlined /></ButtonComponent>*/}
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <MaterialsArray
                            floorIndex={floorIndex}
                            familyIndex={index}
                            {...{ control, register, errors, floorNumber, familyCB, submitFloor, handleSubmit, setValue, putFloor, reset, idFamilia }}
                        />
                        <TableRow>
                        </TableRow>
                    </>
                );
            })}
            <TableRow>
                <TableCell colSpan='100%'>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonComponent onClick={() => { append() }}>Agregar Familia</ButtonComponent>
                    </Box>
                </TableCell>
            </TableRow>
        </>
    )
}