// --------------------------- MATERIALS ARRAYS ---------------------------
// REACT IMPORTS
import React from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { FormControl, InputLabel, Select, MenuItem, Box, TableCell, TableRow } from '@mui/material';

import TextField from '@mui/material/TextField';
import ButtonComponent from 'components/main_components/button_component/index';
import { updateCopyMaterialGroups } from 'pages/cubage/cubage_slices/full_cubage_sections/copy_full_groups';
import { updateMaterialGroupsRemove } from 'pages/cubage/cubage_slices/full_cubage_sections/cubage_full_material_groups_slice';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Stack } from '../../../../../node_modules/@mui/material/index';

const Materials = ({
  floorIndex,
  familyIndex,
  control,
  register,
  floorNumber,
  familyCB,
  handleSubmit,
  submitFloor,
  setValue,
  putFloor,
  reset,
  idFamilia
}) => {
  // REACT-HOOK-FORM CONFIG
  const { fields, remove, append } = useFieldArray({
    control,
    name: `floor[${floorIndex}].families[${familyIndex}].materials`
  });

  // MATERIAL CODE
  const [code, setCode] = React.useState([]);
  const [validador, setValidador] = React.useState(false);
  const [comboBoxId, setComboBoxId] = React.useState();
  const [newTotal, setNewTotal] = React.useState();
  const [materialIndex, setMaterialIndex] = React.useState();
  const [isNew, setIsNew] = React.useState();

  const [isLocked, setIsLocked] = React.useState(false);

  const [lockQuantity, setLockQuantity] = React.useState(true);
  const dispatch = useDispatch();
  // GETTING DATA FROM STORE
  const materials = useSelector((store) => store.materials);
  const rows = useSelector((store) => store.cubageFloor);
  const famil = useSelector((store) => store.cubageGroups);
  const identificadorPiso = rows[floorNumber];
  const filterFamil = famil.filter((e) => e.cubication_section == identificadorPiso?.cubication_section);

  React.useEffect(() => {
    if (idFamilia == undefined) {
      setComboBoxId(familyCB);
    } else {
      setComboBoxId(idFamilia);
    }
  });

  // CHANGE BUTTONS
  React.useEffect(() => {
    reset({ test: [] });
    if (filterFamil[familyIndex]) {
      if (rows[floorIndex]?.isNew == false) {
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    } else {
      setIsNew(true);
    }
  }, []);

  // MATERIALS LIST FILTERED BY FAMILY ID
  const list = materials.filter((e) => e.material_family_id == comboBoxId);

  // MATERIAL COMBOBOX OPTIONS
  const generateMaterialsOptions = () => {
    return list.map((material) => {
      return (
        <MenuItem key={material.id} value={material.id} name={material.name}>
          {material.name}
        </MenuItem>
      );
    });
  };

  // SETTING THE MATERIAL CODE TO AN STATE
  const handelMaterial = (e) => {
    const foundmaterial = materials.find((mater) => mater.id === e);
    setCode(foundmaterial.code);
  };

  const cubage = useSelector((store) => store.cubageGroups);
  const data = useSelector((store) => store.cubageGroups);
//console.log('data', data)
  const cargar2segundos = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 800);
    });
  };

  // GENERATE MATERIALS ARRAY FIELDS FUNCTION
  React.useEffect(() => {
    reset({ test: [] });
    filterFamil[familyIndex]?.materias.map((i, index) => {
      append({});
    });
  }, [append, famil]);

  const lockButton = () => {
    setIsLocked(true);
  };

  const unlockQuantity = () => {
    setLockQuantity(false);
  };
  
  const isRemove = (index) => {
    let arr = filterFamil[0]?.id
    //console.log('arr', filterFamil[0]?.materias[index]?.id)
    dispatch(updateCopyMaterialGroups({isRemove: true, id: arr}));
    dispatch(updateMaterialGroupsRemove({id: arr}))
    remove(index)
  };

  return (
    <>
      {fields.map((item, m) => {
        return (
          <TableRow key={item.id}>
            <TableCell sx={{ borderBottom: 1, borderLeft: 1, width: 200 }}>
              <Controller
                control={control}
                name={`floor[${floorIndex}].families[${familyIndex}].materials[${m}].material`}
                defaultValue={filterFamil[familyIndex]?.materias[m]?.material?.id}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    sx={{
                      display: 'inline-flex',
                      width: 120,
                      '& .MuiInputBase-root': { height: 30, borderRadius: '12px' },
                      '& .MuiInputBase-input': { fontFamily: 'Roboto', fontSize: 14 }
                    }}
                  >
                    <InputLabel>Material</InputLabel>
                    <Select
                      onChange={onChange}
                      onBlur={(e) => {
                        handelMaterial(e.target.value), unlockQuantity();
                      }}
                      value={value}
                      autowidth="true"
                      defaultValue={filterFamil[familyIndex]?.materias[m]?.material?.id}
                      sx={{ display: 'inline-flex', width: 180 }}
                    >
                      {generateMaterialsOptions()}
                    </Select>
                  </FormControl>
                )}
              />
            </TableCell>
            {rows[floorNumber]?.apartment_groups?.map((i, indice) => {
              const isNew = rows[floorNumber]?.isNew;
              const id = i.id;
              // CREAR FUNCION PARA ORDENAR POR ID
              async function asyncCall() {
                const result = await cargar2segundos();
                let result2 = [...result];
                let sort = result2.sort((a, b) => (a.id < b.id ? -1 : Number(a.id > b.id)));
                let filteredSort = sort.filter((e) => e.cubication_section == identificadorPiso?.cubication_section);
                const materialeslista = filteredSort[familyIndex]?.materias[m]?.material_apartment_groups;
                const total = filteredSort[familyIndex]?.materias[m]?.total;
                setValue(`floor[${floorIndex}].families[${familyIndex}].materials[${m}].total`, total);
                //console.log('isremove', filteredSort[0])
                if(filteredSort[0]?.isRemove == false){
                    setValue(
                      `floor[${floorIndex}].families[${familyIndex}].materials[${m}].material_apartment_groups[${indice}].quantity`,
                      materialeslista[indice]?.quantity?.toString()
                    );
                } 
              }
              asyncCall();
              return (
                <>
                  <TableCell sx={{ border: 1 }} colSpan="2" key={i.id}>
                    {/*<input hidden disabled placeholder={i?.id} {...register(`floor[${floorIndex}].families[${familyIndex}].materials[${m}].material_apartment_groups[${indice}].apartment_cto_group`, { value: parseInt(isNew ? i.id : i.apartment_cto_groups[0].id) })} value={i?.id} defaultValue={i?.id} />*/}
                    <input
                      hidden
                      placeholder="id"
                      label="id"
                      {...register(
                        `floor[${floorIndex}].families[${familyIndex}].materials[${m}].material_apartment_groups[${indice}].apartment_cto_group`,
                        { value: parseInt(isNew ? i.id : i.apartment_cto_groups[0].id) }
                      )}
                      value={i?.id}
                    />
                    <TextField
                      disabled={lockQuantity}
                      type="number"
                      placeholder="cantidad"
                      {...register(
                        `floor[${floorIndex}].families[${familyIndex}].materials[${m}].material_apartment_groups[${indice}].quantity`
                      )}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000000' },
                        '& .MuiInputBase-root': { height: 30 }
                      }}
                    />
                  </TableCell>
                </>
              );
            })}
            <TableCell sx={{ border: 1 }}>
              <TextField
                id={`floor[${floorIndex}].families[${familyIndex}].materials[${m}].total`}
                {...register(`floor[${floorIndex}].families[${familyIndex}].materials[${m}].total`)}
                sx={{ width: 70 }}
              ></TextField>
            </TableCell>
            <TableCell sx={{ border: 1 }} colSpan="100%">
              <Box>
                <Stack direction="row" justifyContent="end">
                  <ButtonComponent onClick={() => isRemove(m) } color="error" tooltip={`Eliminar material`}>
                    <MinusCircleOutlined />
                  </ButtonComponent>
                </Stack>
              </Box>
            </TableCell>
          </TableRow>
        );
      })}
      <TableRow style={{ background: 'rgb(24 666 255 / 20%)' }}>
        <TableCell sx={{ border: 1 }} colSpan="100%">
          <Box sx={{ fisplay: 'flex' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack>
                <ButtonComponent onClick={() => append()} color="success">
                  Agregar Material&nbsp;
                  <PlusCircleOutlined />
                </ButtonComponent>
              </Stack>
              <Stack>
                <div>
                  {isNew ? (
                    <ButtonComponent
                      disabled={isLocked}
                      onClick={handleSubmit((data) => {
                        submitFloor(data, floorNumber, floorIndex, familyIndex), lockButton();
                      })}
                    >
                      Finalizar Familia
                    </ButtonComponent>
                  ) : (
                    <ButtonComponent
                      onClick={handleSubmit((data) => {
                        putFloor(data, floorNumber, floorIndex, familyIndex);
                      })}
                    >
                      Actualizar Familia
                    </ButtonComponent>
                  )}
                  {/*<ButtonComponent onClick={handleSubmit((data) => { submitFloor(data, floorNumber, floorIndex, familyIndex) })}>Finalizar Familia</ButtonComponent>
                                <ButtonComponent onClick={handleSubmit((data) => { putFloor(data, floorNumber, floorIndex, familyIndex) })}>Actualizar Familia</ButtonComponent>*/}
                </div>
              </Stack>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Materials;
