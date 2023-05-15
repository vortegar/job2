// REACT IMPORTS
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import TextFieldComponent from '../../../components/main_components/textfield_component/index';
import TitleComponent from 'components/main_components/title_component/index';


const ProvidersView = (props) => {
    // VATIABLE ASSIGNMENT OF PROPS RECEIVED
    const { abrir, closeView, provider } = props;
    const {
        name,
        social_reason,
        rut,
        address,
        extra_address,
        phone,
        seller_full_name,
        seller_email,
        region,
        province,
        commune,
        speciality,
        product_type,
        payment_method,
    } = provider[0];

    // MODAL CLOSING FUNCTION 
    const handleClose = () => {
        closeView();
    };

    return (
        <div>
            <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>Visualizar Product</DialogTitle>
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
                        <DialogTitle sx={{ fontSize: 13, fontFamily: 'Roboto', fontWeight: 'bold' }}>Datos de proveedor</DialogTitle>
                        <Box sx={{
                            '& .MuiTextField-root': { m: -1, width: '25ch' },
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}>

                            <Typography variant="h6" gutterBottom>
                                Nombre:&nbsp;&nbsp;
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {name}
                            </Typography>
                            <TitleComponent>Nombre: {name}</TitleComponent>
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={name} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={social_reason} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={rut} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={address} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={extra_address} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={phone} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={seller_full_name} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={seller_email} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={seller_full_name} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={speciality} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={product_type} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={payment_method} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={region} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={province} />
                            <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={commune} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <ButtonComponent onClick={() => { handleClose() }} type="Submit" variant="contained" color="success" > Cerrar </ButtonComponent>
                </DialogActions>
            </Dialog>
        </div>
    )
    
}

ProvidersView.propTypes = {
    abrir: PropTypes.bool,
    closeView: PropTypes.func,
    id: PropTypes.string,
    provider: PropTypes.object,
}





export default ProvidersView;