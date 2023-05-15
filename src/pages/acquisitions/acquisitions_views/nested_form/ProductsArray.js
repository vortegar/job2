import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { TableRow } from '@mui/material';
import MaterialsArray from './MaterialsArray';
const ProductsArray = ({ control, register, getValues, errors, handleSubmit, setValue, reset }) => {
  // REACT-HOOK-FORM CONFIG
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products'
  });
  const products = useSelector((store) => store.acquisition);
  useEffect(() => {
    reset();
    products?.map((i, index) => {
      append({});
    });
  }, [append, products]);

  return (
    <React.Fragment>
      {fields.map((item, index) => {
        const producto = products[index];
        return (
          <React.Fragment>
            <TableRow key={item.id} sx={{  border: 1  }}>
              <h1>{producto.material_family}</h1>
              <MaterialsArray productIndex={index} {...{ control, register, getValues, errors, handleSubmit, setValue, reset }} />
            </TableRow>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default ProductsArray;
