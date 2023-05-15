// REACT IMPORTS
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useController, useForm } from 'react-hook-form';


const Input = (props) => {
    const { field, fieldState, formState } = useController(props);
    return (
        <div>
            <TextField {...field} placeholder={props.name} error={!!formState.errors} helperText={formState.errors[props.name]?.message} />
            <p>{formState.errors[props.name]?.message}</p>
        </div>
    );
}

export default Input;