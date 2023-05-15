import React, { useEffect } from "react";
import ProvidersArray from "./ProvidersArray";
import { useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem, Box, TableCell, TableRow, Button, Input } from '@mui/material';
const MaterialsArray = ({ control, register, getValues, errors, handleSubmit, setValue, reset, productIndex }) => {

    // REACT-HOOK-FORM CONFIG
    const { fields, append, remove } = useFieldArray({
        control,
        name: `products[${productIndex}].materials`
    });
    const products = useSelector(store => store.acquisition);

    useEffect(() => {
        reset();
        products[productIndex]?.family_materials.map((i, index) => {
            append({})
        })
    }, [append, products])

    return (
        <React.Fragment>
            {fields.map((item, index) => {
                const materials = products[productIndex]?.family_materials[index].material_levels[0];
                return (
                  <React.Fragment>
                    <TableRow key={item.id}  sx={{  border: 1 }}>
                      <h6>{materials.material_name}</h6>
                      <ProvidersArray
                        productIndex={productIndex}
                        materialIndex={index}
                        {...{ control, register, getValues, errors, handleSubmit, setValue, reset }}
                      />
                    </TableRow>
                  </React.Fragment>
                );
            })}
        </React.Fragment>
    )
}

export default MaterialsArray;