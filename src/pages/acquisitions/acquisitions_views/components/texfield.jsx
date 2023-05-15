import { InputLabel, TextField, FormHelperText } from '../../../../../node_modules/@mui/material/index';

import { Controller } from 'react-hook-form';
const TextfieldCustom = (props) => {
  const { items, label, width, placeholder, height, onChange, data, name, ...rest } = props;

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
          <TextField
            {...field}
            name={name}
            fullWidth
            placeholder={placeholder}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <FormHelperText id="name-product-field" sx={{ color: '#FF758C;' }}>
            {error?.message}
          </FormHelperText>
        </>
      )}
    />
  );
};

export default TextfieldCustom;
