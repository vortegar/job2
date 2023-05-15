import React from "react";
import ButtonComponent from "components/main_components/button_component/index"
import { Box, Dialog } from "../../../../node_modules/@mui/material/index"
import instance from 'services/axios_config';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import TitleComponent from "components/main_components/title_component/index";
import SubTitleComponent from "components/main_components/subtitle_component/index";

const CubageConfirm = (props) => {

    const [load, setLoad] = React.useState(true);

    const deleteFloorId = useSelector(store => store.cubageFormStates.deleteFloorId);

    const { open, close } = props;

    React.useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 5000)
    }, [open])

    const deleteF = () => {
        instance.delete(`full_cubage_sections/${deleteFloorId}/`)
            .then((response) => {
                toast.success("Piso eliminado correctamente")
               /*  window.location.reload(); */
               /*  reload(); */
            }).catch((error) => {
                console.error(error);
                toast.error("Error al eliminar piso")
                reset();
            })
    }





    return (
        <div>
            <Dialog open={open} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 400, height: 250 } }}>
                <Box sx={{
                    '& .MuiTextField-root': { m: -1, width: '25ch' },
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                }}
                    noValidate >
                    <Box sx={{width: '100%'}}>
                        <Box sx={{
                    '& .MuiTextField-root': { m: -1, width: '25ch' },
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
                    noValidate>
                            <TitleComponent>ESTA SEGURO QUE DESEA ELIMINAR PISO?</TitleComponent>
                            <SubTitleComponent>Al eliminar el piso se borraran todos los registros del mismo</SubTitleComponent>
                        </Box>

                    </Box>
                    <Box  sx={{
                    '& .MuiTextField-root': { m: -1, width: '25ch' },
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
                    noValidate>
                        <ButtonComponent onClick={deleteF} disabled={load} color={'error'} variant={'contained'}>Eliminar</ButtonComponent>
                        <ButtonComponent onClick={close}>Cancelar</ButtonComponent>
                    </Box>
                </Box>
            </Dialog>
        </div>
    )
}

export default CubageConfirm;