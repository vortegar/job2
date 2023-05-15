import { InputLabel, Select, MenuItem, Box, FormHelperText } from '../../../../../node_modules/@mui/material/index';

import { Controller } from 'react-hook-form';
const SelectCustom = (props) => {
  const { items, label, width, placeholder, height, onChange, data, name, ...rest } = props;
  const family = [
    { family: 'Porveedor 1', id: 1 },
    { family: 'Proveedor 2', id: 2 }
  ];
  function selectLabel(id) {
    let selectText = family.filter((item) => item.id === id);
    return selectText[0]?.family;
  }
  return (
    <Controller
      control={props.control}
      {...rest}
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <>
          {' '}
          <InputLabel shrink htmlFor={name} sx={{ textAlign: 'start' }}>
            {label}
          </InputLabel>
          <Select
            defaultValue={''}
            id={name}
            name={name}
            displayEmpty
            onChange={field.onChange}
            fullWidth
            renderValue={(value) => {
              return (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  {value ? <>{selectLabel(value)}</> : <div style={{ color: '#A9A9AC' }}>{placeholder}</div>}
                </Box>
              );
            }}
          >
            <MenuItem key={'default_value_select'} value={''}>
              Seleccione
            </MenuItem>
            {family?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.family}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText id="name-product-field" sx={{ color: '#FF758C;' }}>
            {error?.message}
          </FormHelperText>
        </>
      )}
    />
  );
};

export default SelectCustom;
