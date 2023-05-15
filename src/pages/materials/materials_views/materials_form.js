//REACT IMPORTS
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'


// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import TextFieldComponent from '../../../components/main_components/textfield_component/index';

// STATES IMPORTS
import { editMaterial } from 'pages/materials/materials_slices/materials_slice';
import { setDisabledButton } from 'pages/materials/materials_slices/materials_states';

// AXIOS METHODS IMPORTS
import { getFamilyData } from 'pages/families/families_services/families_service';
import { getSubFamilyData } from 'pages/sub_families/subFamilies_services/subFamilies_services';
import { getMaterialData, postData, updateData } from '../materials_services/materials_service';


const FormDialog = (props) => {

  const dispatch = useDispatch();

  // IMPORT DATA FROM API
  useEffect(() => {
  //  getFamilyData(dispatch);
    //getSubFamilyData(dispatch);
  }, [])

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

  // YUP SCHEME SETUP
  const validationSchema = yup.object({
    name: yup.string().required("Titulo es necesario para ingresar material").min(3, "Titulo no puede tener menos de 3 caracteres"),
    description: yup.string().required("Descripcion es necesaria para ingresar material"),
    code: yup.string().required("Codigo es necesario para ingresar material"),
    price: yup.number().required("Precio es necesario para ingresar material"),
    measure_unit: yup.string().required("Unidad de medida es necesaria para ingresar material").max(6, "Unidad de medida no puede tener mas de 6 caracteres"),
  });

  const resolver = useYupValidationResolver(validationSchema);


  // VARIABLE ASSIGNMENT OF PROPS RECEIVED
  const { abrir, closeModal, id, product } = props;


  // REACT-HOOK-FORMS USES
  const { handleSubmit, formState: { errors }, control } = useForm({ resolver });


  // STORE STATES IMPORTS
  const isNew = useSelector(store => store.productsStates.isNew);


  isEmpty(errors) ? dispatch(setDisabledButton(false)) : dispatch(setDisabledButton(true));


  // DATA ASSIGN TO COMBOBOX
  const families = useSelector(store => store.families)

  const generateFamilyOptions = () => {
    return families.map((family) => {
      return (
        <MenuItem key={family.id} value={family.id}>
          {family.name}
        </MenuItem>
      );
    });
  }

  const subFamilies = useSelector(store => store.subFamilies)
  const generateSubFamilyOptions = () => {
    return subFamilies.map((subFamily) => {
      return (
        <MenuItem key={subFamily.id} value={subFamily.id}>
          {subFamily.name}
        </MenuItem>
      );
    });
  }


  // MODAL CLOSING FUNCTION
  const handleClose = () => {
    closeModal();
  };

  // ADD PRODUCT TO THE STORE FUNCTION
  const handleAdd = (data) => {
    postData(data);
    closeModal();
  };

  // MODIFIES A PRODUCTO FROM THE STORE FUNCTION
  const handleMod = (id, data) => {
    updateData(id, data);
    getMaterialData(dispatch, id);
    closeModal();
  }
 
  return (
    <div>
      <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px', width: 700 } }}>
        <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>{isNew ? 'Nuevo Material' : 'Editar'}</DialogTitle>
        <DialogTitle  >{isNew ? 'Ingresa los datos para poder ingresar el Material' : 'Ingresa los datos nuevos para editar el Material'}</DialogTitle>
        <form sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit((data) => {
          isNew ? handleAdd(data) : handleMod(id, data)
        })}>
          <DialogContent >
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
              <Controller name="name" control={control} defaultValue={isNew ? '' : product[0].name}
                render={({ field: { onChange, value }, formState }) => (
                  <TextFieldComponent id="name" label="Nombre" type="text" defaultValue={isNew ? value : product[0].name} onChange={onChange} error={!!formState.errors?.name} helperText={formState.errors?.name?.message} />
                )}
              />
              <Controller name="description" control={control} defaultValue={isNew ? '' : product[0].description}
                render={({ field: { onChange, value }, formState }) => (
                  <TextFieldComponent id="description" label="Descripcion" type="text" defaultValue={isNew ? value : value = product[0].description} onChange={onChange} error={!!formState.errors?.description} helperText={formState.errors?.description?.message} />
                )}
              />
              <Controller name="code" control={control} defaultValue={isNew ? '' : product[0].code}
                render={({ field: { onChange, value }, formState }) => (
                  <TextFieldComponent id="code" label="Codigo" type="text" defaultValue={isNew ? value : product[0].code} onChange={onChange} error={!!formState.errors?.code} helperText={formState.errors?.code?.message} />
                )}
              />
              <Controller name="price" control={control} defaultValue={isNew ? '' : product[0].price}
                render={({ field: { onChange, value }, formState }) => (
                  <TextFieldComponent id="price" label="Precio" type="number" defaultValue={isNew ? value : product[0].price} onChange={onChange} error={!!formState.errors?.price} helperText={formState.errors?.price?.message} />
                )}
              />
              <Controller name="measure_unit" control={control} defaultValue={isNew ? '' : product[0].measure_unit}
                render={({ field: { onChange, value }, formState }) => (
                  <TextFieldComponent id="measure_unit" label="Unidad de medida" type="text" defaultValue={isNew ? value : product[0].measure_unit} onChange={onChange} error={!!formState.errors?.measure_unit} helperText={formState.errors?.measure_unit?.message} />
                )}
              />
              <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                <Controller
                  control={control}
                  name="material_subfamily"
                  defaultValue={isNew ? '' : product[0].material_subfamily_id}
                  render={({ field: { onChange, value } }) => (
                    <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                      <InputLabel>Sub Familia</InputLabel>
                      <Select onChange={onChange} value={value} autowidth='true'
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                      >
                        {generateSubFamilyOptions()}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                <Controller
                  control={control}
                  name="material_family"
                  defaultValue={isNew ? '' : product[0].material_family_id}
                  render={({ field: { onChange, value } }) => (
                    <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                      <InputLabel>Familia</InputLabel>
                      <Select onChange={onChange} value={value} autowidth='true'
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                      >
                        {generateFamilyOptions()}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <ButtonComponent type="Submit" variant="contained" color="success" > {isNew ? 'Agregar' : 'Modificar'}</ButtonComponent>
            <ButtonComponent onClick={handleClose} variant="contained" color="error">Cancelar</ButtonComponent>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  abrir: PropTypes.bool,
  closeModal: PropTypes.func,
  id: PropTypes.number,
  product: PropTypes.array
}

export default FormDialog;