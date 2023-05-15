// REACT IMPORTS
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { Controller, useForm } from 'react-hook-form';


const TextFieldComponent = ({ id, label, type, value, onChange, helperText, defaultValue, error, disabled, onBlur, hidden }) => {
    return (
        <Box sx={{
            p: 1,
            m: 1, display: 'inline-flex', flexGrow: 1
        }} >
            <TextField
                margin="dense"
                id={id}
                label={label}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                fullWidth
                defaultValue={defaultValue}
                error={error}
                helperText={helperText}
                variant="outlined"
                border="4"
                disabled={disabled}
                sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}
            />
        </Box>
    );
}

export default TextFieldComponent;