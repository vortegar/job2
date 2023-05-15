import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '../../../../../../node_modules/react-redux/es/exports';

// UI IMPORTS
import { ToastContainer, toast } from 'react-toastify';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

// modal
import Modal from '@mui/material/Modal';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

import TextFieldComponent from './../../../../../components/main_components/textfield_component';

import * as yup from 'yup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    radius:'15px',
    pt: 2,
    px: 4,
    pb: 3,
  };

import { resetPassword } from 'pages/users/users_services/users_services';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    // YUP SETUP
    const useYupValidationResolver = validationSchema =>
        useCallback(
            async data => {
                try {
                    const values = await validationSchema.validate(data, {
                        abortEarly: false
                    });

                    return {
                        values,
                        errors: {}
                    };
                } catch (errors) {
                    return {
                        values: {},
                        errors: errors.inner.reduce(
                            (allErrors, currentError) => ({
                                ...allErrors,
                                [currentError.path]: {
                                    type: currentError.type ?? "validation",
                                    message: currentError.message
                                }
                            }),
                            {}
                        )
                    };
                }
            },
            [validationSchema]
        );

    // console.log(localStorage.getItem('token'))
    
    const validationSchema = yup.object({
        // token: yup.string(localStorage.getItem('token')),
        password: yup.string().required("Contraseña necesaria"),
        confirm_password: yup.string().required("Contraseña necesaria"),
    });

    const resolver = useYupValidationResolver(validationSchema);

        // REACT-HOOK-FORM USES
        const { handleSubmit, formState: { errors }, control } = useForm({ resolver });

    // STORE STATES IMPORTS
    const isNew = false


    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    
    
    const handleMod = ( data) => {
        // console.log(data)
        dispatch(resetPassword({...data,token:localStorage.getItem('token')}))
        // handleClose();
    }

    return (
        <>
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
{/*             <ListItemButton onClick={handleOpen} selected={selectedIndex === 0} >
                <ListItemIcon>
                    <EditOutlined />
                </ListItemIcon>
                <ListItemText primary="Mi Perfil" />
            </ListItemButton> */}
            {/* <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                    <UserOutlined />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
            </ListItemButton> */}

            {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon>
                    <ProfileOutlined />
                </ListItemIcon>
                <ListItemText primary="Social Profile" />
            </ListItemButton> */}
            {/* <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                <ListItemIcon>
                    <WalletOutlined />
                </ListItemIcon>
                <ListItemText primary="Billing" />
            </ListItemButton> */}
            <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
        </List>
 
      
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
            <div>
                <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>Perfil</DialogTitle>
                <DialogTitle  >Datos personales</DialogTitle>
                <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => {
                    handleMod(data)
                })}>

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
                            <TextFieldComponent id="Nombre" label="Nombre" type="text" defaultValue={isNew ? value : 'Rodrigo'}  />
                            <TextFieldComponent id="Nombre" label="Apellido" type="text" defaultValue={isNew ? value : 'Mujica'}  />
                            <TextFieldComponent id="Nombre" label="Perfil" type="text" defaultValue={isNew ? value : 'Administrador'}  />
                            
                            
                        </Box>
                    </DialogContent>
                    
                </form>

                <DialogTitle  >Cambiar Contrseña</DialogTitle>
                <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => {
                    handleMod(data)
                })}>

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
                           
                            <Controller name="password" control={control} defaultValue={isNew ? '' : ''}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="password" label="password" type="password" defaultValue={isNew ? value : ''} onChange={onChange} error={!!formState.errors?.password} helperText={formState.errors?.password?.message} />
                                )}
                            />
                            <Controller name="confirm_password" control={control} defaultValue={isNew ? '' : ''}
                                render={({ field: { onChange, value }, formState }) => (
                                    <TextFieldComponent id="confirm_password" label="confirm_password" type="password" defaultValue={isNew ? value : ''} onChange={onChange} error={!!formState.errors?.confirm_password} helperText={formState.errors?.confirm_password?.message} />
                                )}
                            />
                            
                        </Box>
                        {/* <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                            <Controller
                                control={control}
                                name="group"
                                defaultValue={isNew ? '' : user[0].groups[0].id}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl sx={{ display: 'inline-flex', width: 620, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                                        <InputLabel>Tipo de Usuario</InputLabel>
                                        <Select onChange={onChange} value={value || ''} autowidth='true'
                                            sx={{ display: 'inline-flex', flexGrow: 1 }}
                                        >
                                            {generateUserTypeOptions()}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Box> */}
                    </DialogContent>
                    <DialogActions>
                        <ButtonComponent type="Submit" variant="contained" color="success" >Actualizar</ButtonComponent>
                        <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
                    </DialogActions>
                </form>
            </div>
        </Box>
      </Modal>
      </>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
