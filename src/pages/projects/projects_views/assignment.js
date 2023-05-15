//REACT IMPORTS
import { useRef, useState, useEffect } from 'react';

import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';

import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setOpenAssignment } from '../projects_slices/projects_states';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField, MenuItem, Select } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { getListProjects } from '../projects_services/projects_service';

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styleInput = { borderRadius: '10px', width: '100%', textAlign: 'center' };
const Item = styled(Paper)(({ theme }) => ({
  border: 0,
  textAlign: 'center',
  boxShadow: 'none',
  paddingTop: '1px'
}));

// http Axios
import instance from 'services/axios_config';
import { updateAsignment } from '../project-single/project-single-services/projectSingleServices';

const ListDocuments = (props) => {
  const dispatch = useDispatch();
  const { abrir, id, status, idSupervisor, idCubicator } = props;

  const [listSupervised, setListSupervised] = useState([]);

  const [listCubicator, setListCubicator] = useState([]);

  const generateListSupervised = () => {
    return listSupervised.map((supervised) => {
      return (
        <MenuItem key={supervised.id} value={supervised.id}>
          {' '}
          {supervised.first_name} {supervised.last_name}
        </MenuItem>
      );
    });
  };

  const generateListCubicator = () => {
    return listCubicator.map((cubicator) => {
      return (
        <MenuItem key={cubicator.id} value={cubicator.id}>
          {' '}
          {cubicator.first_name} {cubicator.last_name}
        </MenuItem>
      );
    });
  };

  const handleClose = () => {
    dispatch(setOpenAssignment(false));
  };

  const notify = () => toast.success('Asignación realizada exitomamente');

  const onSubmit = (data) => {
    dispatch(getListProjects(data));
    dispatch(updateAsignment(id, data));
    // notify();
    // reset();
  };

  useEffect(() => {
    // get supervisor
    instance
      .get('users/?groups=3')
      .then((res) => {
        setListSupervised(res.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    // get cubicator
    instance
      .get('users/?groups=2')
      .then((res) => {
        setListCubicator(res.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // YUP SCHEME SETUP
  const validationSchema = yup.object({
    supervised_by: yup.string().required('Requiere supervisor'),
    cubicator: yup.string().required('Requiere cubicador')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <div>
      <Dialog open={abrir} onClose={handleClose} sx={{ '& .MuiPaper-root': { borderRadius: '14px', width: 800 } }}>
        <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}> Asignación </DialogTitle>
        <form
          sx={{ m: 1, minWidth: 2120 }}
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <DialogContent style={{ height: '180px' }}>
            <Box
              sx={{
                '& .MuiTextField-root': { m: -1, width: '65ch' },
                display: 'flex',
                justifyContent: 'space-around',

                flexDirection: 'column'
              }}
              noValidate
            >
              <DialogActions>
                <Item>
                  <label htmlFor="actual-btn">Cubicador</label>
                  <Controller
                    control={control}
                    name="cubicator"
                    defaultValue={!idCubicator ? '' : idCubicator}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        style={styleInput}
                        onChange={onChange}
                        autowidth="true"
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                        {...register('cubicator')}
                        value={!idCubicator ? value : idCubicator}
                        disabled={status}
                      >
                        {generateListCubicator()}
                      </Select>
                    )}
                  />
                  <p style={{ color: 'red' }}>{errors.cubicator?.message}</p>
                </Item>

                <Item>
                  <label htmlFor="actual-btn">Supervisor</label>
                  <Controller
                    control={control}
                    name="supervised_by"
                    defaultValue={!idSupervisor ? '' : idSupervisor}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        style={styleInput}
                        onChange={onChange}
                        autowidth="true"
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                        {...register('supervised_by')}
                        value={!idSupervisor ? value : idSupervisor}
                        disabled={status}
                      >
                        {generateListSupervised()}
                      </Select>
                    )}
                  />
                  <p style={{ color: 'red' }}>{errors.supervised_by?.message}</p>
                </Item>
              </DialogActions>
            </Box>
          </DialogContent>
          <DialogActions>
            <ButtonComponent type="submit" variant="contained" color={'success'} disabled={status}>
              <SaveOutlined style={{ fontSize: '17px' }} />
            </ButtonComponent>
            <ButtonComponent onClick={handleClose} variant="contained" color="error">
              <CloseCircleOutlined style={{ fontSize: '17px' }} />
            </ButtonComponent>
          </DialogActions>
        </form>
        <ToastContainer />
      </Dialog>
    </div>
  );
};

export default ListDocuments;
