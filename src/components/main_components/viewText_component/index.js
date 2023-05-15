// MATERIAL UI IMPORTS
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ViewTextComponent = ({ id, label, type, defaultValue }) => {
    return (
        <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
            <TextField
                disabled
                margin="dense"
                id={id}
                label={label}
                type={type}
                defaultValue={defaultValue}
                InputProps={{
                    readOnly: true,
                }}
                fullWidth
                variant="outlined"
                sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}
            />
        </Box>
    );
}

export default ViewTextComponent;