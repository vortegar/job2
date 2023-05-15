import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, TableCell, TableRow, Button, Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const ProvidersArray = ({ control, register, getValues, errors, handleSubmit, setValue, reset, productIndex, materialIndex}) => {

    // REACT-HOOK-FORM CONFIG
    const { fields, append, remove } = useFieldArray({
        control,
        name: `products[${productIndex}].materials[${materialIndex}].providers`
    });

    // IMPORTING INITIAL STATE FROM THE STORE
    const providers = useSelector(store => store.providers)
    console.log(providers);

    const generateProvidesOptions = () => {
        return providers.map((provider) => {
            return (
                <MenuItem key={provider.id} value={provider.id} name={provider.name}>
                    {provider.name}
                </MenuItem>
            );
        });
    }



    return (
        <React.Fragment>
            {fields.map((item, index) => {
                return (
                    <>                    
                     <TableCell key={item.id} sx={{ border: 1 }} colSpan="100%">
                        <h4>provedor:{index} de producto {productIndex}</h4>
                        <Box mt={1}>
                            <Controller
                                control={control}
                                name={`products[${productIndex}].materials[${materialIndex}].providers[${index}].providersCmbox`}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl sx={{ display: 'inline-flex', width: 192, "& .MuiInputBase-root": { height: 30, borderRadius: '4px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                        <InputLabel>Proveedor</InputLabel>
                                        <Select onChange={onChange} value={value} autowidth='true' 
                                            sx={{ display: 'inline-flex', width: 180 }}
                                        >
                                            {generateProvidesOptions()}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Box>
                        <Box mt={2}>
                        <TextField
                          id="quantity"
                          label="Cantidad"
                          key={item.id}{...register(`products[${productIndex}].materials[${materialIndex}].providers[${index}].nombre`)}
                          variant="outlined" 
                        />
                        </Box>
                    </TableCell>
                    </>
                )
            })}
            <Button onClick={() => { append() }}>Agregar Proveedor</Button>
        </React.Fragment>
    )
}

export default ProvidersArray;