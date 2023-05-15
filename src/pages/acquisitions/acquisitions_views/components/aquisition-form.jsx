import React from 'react';
import SelectCustom from './select';
import TextfieldCustom from './texfield';
import { PlusOutlined, UpOutlined, DownOutlined, MoreOutlined } from '@ant-design/icons';
import { Grid, Paper, List, Collapse, Divider, TextField, InputLabel, Tooltip, IconButton } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, UseFormWatch, UseFieldArrayRemove, Control, useWatch, FormState } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import DenseTable from './table';
import './form-style.css';
import * as yup from 'yup';
const AcquisitionsForm = ({ material_name }) => {
  const schema = yup
    .object()
    .shape({ stockist: yup.string().required('Este campo es requerido'), amount: yup.string().required('Este campo es requerido') });
  const {
    watch,
    reset,
    control,
    formState,
    setValue,
    setError,
    trigger,
    getValues,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      stockist: '',
      amount: 0
    },
    mode: 'onBlur'
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Paper className="paper-form">
        <Grid container spacing={2}>
          <Grid item xs={9} sx={{ color: open ? '#6880ff' : 'innherit' }}>
            <b> {material_name}</b>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {' '}
            {open ? (
              <IconButton
                className="button-list"
                onClick={handleClick}
                sx={{
                  color: '#6880ff !important'
                }}
              >
                {' '}
                <span>
                  <UpOutlined />
                </span>
              </IconButton>
            ) : (
              <IconButton className="button-list" onClick={handleClick}>
                {' '}
                <span>
                  <DownOutlined />
                </span>
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <form onSubmit={handleSubmit(onSubmit)}>
              {' '}
              <Grid container spacing={2} sx={{ padding: '0px 20px' }}>
                <Grid item xs={3}>
                  <SelectCustom label="Proveedor" name="stockist" placeholder={'Seleccione un proveedor'} control={control} />
                </Grid>
                <Grid item xs={2}>
                  <InputLabel shrink htmlFor={'amount'} sx={{ textAlign: 'start' }}>
                    Precio
                  </InputLabel>
                  <TextField
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000000',
                        background: '#e7e7e7'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextfieldCustom name="amount" control={control} label="Cantidad" placeholder="Ingrese la cantidad" />
                </Grid>
                <Grid item xs={2}>
                  <InputLabel shrink htmlFor={'cost'}>
                    Costo
                  </InputLabel>
                  <TextField
                    id="cost"
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000000',
                        background: '#e7e7e7'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  {/*        <Tooltip title="Aceptar" placement="top-end">
                  <IconButton className="button-check">
                    <CheckOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" placement="top-end">
                  <IconButton className="button-delete">
                    <DeleteFilled />
                  </IconButton>
                </Tooltip> */}
                  <Tooltip title="Agregar proveedor" placement="top-end">
                    <IconButton
                      type="submit"
                      className="add-provider-register"
                      sx={{
                        '&:hover': {
                          background: '#15bd1c !important'
                        }
                      }}
                    >
                      <span>
                        <PlusOutlined />
                      </span>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <DenseTable />
                <Divider className="divider" />
                <Grid item xs={6} className="total-text">
                  Total
                </Grid>
                <Grid item xs={6} className="total-amount">
                  <b>86CLP</b>
                </Grid>
              </Grid>
            </form>
          </List>
        </Collapse>
      </Paper>
    </>
  );
};

export default AcquisitionsForm;
