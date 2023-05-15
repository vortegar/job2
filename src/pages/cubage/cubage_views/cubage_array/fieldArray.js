// --------------------------- FLOOR ARRAYS ---------------------------
// REACT IMPORTS
import React, { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';

// MATERIAL IMPORTS 
import { Box, TableCell, TableRow, Stack, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { MinusCircleOutlined } from '@ant-design/icons';

// COMPONENTS IMPORTS
import FamiliesArray from "./nestedFieldArray";
import ButtonComponent from "components/main_components/button_component/index";
import CubageConfirm from "../cubage_confirm";
import { dispatch } from "store/index";
import { setFamilyLock } from "pages/cubage/cubage_slices/cubage_states/cubage_form_states";

export default function Fields({ control, register, errors, handleSubmit, submitFloor, setValue, cargarDatos, putFloor, loadApartments, reset, deleteFamily, deleteFloor, updateFloorData }) {

  // REACT-HOOK-FORM CONFIG
  const { fields, append, remove } = useFieldArray({
    control, name: 'floor'
  });

  const [isLocked, setIsLocked] = React.useState(false);

  //const familyLock = useSelector(store => store.cubageFormStates.familyLock);

  const [familyLock, setFamilyLock] = useState(true);
  
  //const confirmOpen = useSelector(store => store.cubageFormStates.confirmOpen);

  // GETTING DATA FROM STORE
  const rows = useSelector(store => store.cubageFloor);
  const copyFloor = useSelector(store => store.copyFloor);
  const ayyy = [{ id: 1 }]
  const [isNew, setIsNew] = useState(true);

  React.useEffect(() => {
    ayyy.map(() => {
      append();
      cargarDatos()
    });
  }, [])

  // FAMILY COMBOBOX OPTIONS
  const generateSearchFloorOptions = () => {
    return copyFloor.map((floor) => {
      //console.log("floor", floor);
      return (
        <MenuItem key={floor.cubication_section} value={floor.cubication_section}>
          {floor.level}
        </MenuItem>
      );
    });
  }

  // GENERATE FLOOR FIELDS ARRAY
  React.useEffect(() => {
    reset({ test: [] })
    rows.map((i, index) => {
      append({})
    })
  }, [append, rows])

  const lockButton = () => {
    setIsLocked(true);
  }

  const unlockFamily = () => {
    setFamilyLock(false);
  }

  return (
    <>
      {fields.map((item, index) => {
        const floorNumber = index;
        setValue(`floor[${index}].level`, rows[index]?.level)
        setValue(`floor[${index}].square_meters_surface`, rows[index]?.square_meters_surface)

        if (rows[index]?.isNew == false) {
          return (
            <>

              <TableRow key={item.id}>
                <TableCell sx={{ border: 1 }} colSpan="100%">
                  <Controller name="level" control={control}
                    render={({ field: { onChange, value }, formState }) => (
                      <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                        <TextField disabled={true} id="level" label="Piso" type="text" onChange={onChange} defaultValue={rows[index]?.level} {...register(`floor[${index}].level`)} InputLabelProps={{ shrink: true }} sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}></TextField>
                      </Box>
                    )}
                  ></Controller>
                  <Controller name="apartment_groups" control={control}
                    render={({ field: { onChange, value }, formState }) => (
                      <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                        <TextField disabled={true} id="apartment_groups" label="Configuracion Departamentos" type="text" onChange={onChange} InputLabelProps={{ shrink: true }} sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}></TextField>
                      </Box>
                    )}
                  ></Controller>
                  <Controller name="square_meters_surface" control={control}
                    render={({ field: { onChange, value }, formState }) => (
                      <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                        <TextField id="square_meters_surface" label="Metros Cuadrados" type="text" onChange={onChange} {...register(`floor[${index}].square_meters_surface`)} InputLabelProps={{ shrink: true }} sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}></TextField>
                      </Box>
                    )}
                  ></Controller>
                  <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                    <Controller
                      control={control}
                      name={`floor[${index}].copy`}
                      render={({ field: { onChange, value } }) => (
                        <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}>
                          <InputLabel disabled shrink={true}>Copiar Familias</InputLabel>
                          <Select disabled={true} onChange={onChange} value={value} autowidth='true'
                            sx={{ display: 'inline-flex', width: 200 }}
                          >
                            {generateSearchFloorOptions()}
                          </Select>
                        </FormControl>
                      )}
                    /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <ButtonComponent disabled={true} onClick={handleSubmit((data) => { loadApartments(data, floorNumber), unlockFamily() })} color="success" variant="contained"> Agregar Piso </ButtonComponent>&nbsp;&nbsp;
                  <ButtonComponent  onClick={handleSubmit((data) => { updateFloorData(data, floorNumber) })} color="secondary" variant="contained"> Editar tipo </ButtonComponent>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow style={{ background: 'rgb(24 144 255 / 20%)', "height": '35px' }}>
                <TableCell sx={{ border: 1, height: 20 }}>

                  <h2 sx={{ height: 20 }}> Piso&nbsp;{rows[index]?.level}</h2>

                </TableCell>
                {copyFloor[floorNumber+1]?.apartment_groups?.map((i, indice) => {
                  const id = i.id;
                  return (
                    <>
                      <TableCell sx={{ border: 1, borderRight: 0, width: 200 }} key={i.id}>
                        <input hidden placeholder="id" label="id"  {...register(`floor[${index}].apartment[${indice}].id`)} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, width: 80 }, }} defaultValue={i.id} />
                        <TextField placeholder="depto" label="Depto." InputLabelProps={{ shrink: true, style: { color: '#000000', background: '#d1e7ff' }, root: { color: '#42f595' } }} {...register(`floor[${index}].apartment[${indice}].apartment_number`)} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, width: 80 }, "MuiInputLabel-root": { color: 'red' } }} defaultValue={i.apartment_number}></TextField>
                      </TableCell>
                      <TableCell sx={{ border: 1, borderLeft: 0, width: 200 }}>
                        {/* <input disabled placeholder={i.id} {...register(`floor[${index}].apartment_cto_group[${indice}]`, { value: parseInt(i.id) })} value={id} defaultValue={id} />*/}
                        {/*<input hidden disabled placeholder={i.apartment_number} />*/}
                        <TextField placeholder="Tipo" label="Tipo" InputLabelProps={{ shrink: true, style: { color: '#000000', background: '#d1e7ff' } }} {...register(`floor[${index}].apartment[${indice}].apartment_type`)} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, width: 80 }, }} defaultValue={i.apartment_type} />
                      </TableCell>
                    </>
                  )
                })}
                <TableCell sx={{ border: 1 }} >TOTAL</TableCell>
                <TableCell colSpan='100%' sx={{ border: 1 }}>
                  <Stack direction="row" justifyContent="end">

                    {/*<ButtonComponent onClick={() => { remove(index), deleteFloor(floorNumber) }} color='error' tooltip='Eliminar Piso'><MinusCircleOutlined /></ButtonComponent>*/}

                    <ButtonComponent onClick={handleSubmit((data) => { deleteFloor(data, floorNumber) })} color='error' tooltip={`Eliminar Piso `}><MinusCircleOutlined /></ButtonComponent>

                  </Stack>

                  <input hidden label="id" placeholder="id" {...register(`floor[${index}].floorId`, { value: rows[index]?.cubication_section })} />

                </TableCell>
              </TableRow>
              <FamiliesArray
                floorIndex={index}
                familyState={false}
                {...{ control, register, errors, handleSubmit, submitFloor, floorNumber, setValue, putFloor, reset, deleteFamily, familyLock, setFamilyLock }}
              />
              <TableRow>
              </TableRow>
            </>
          );
          /*-----------------------------------------------------o-----------------------------------------------------*/
        } else {
          /*-----------------------------------------------------o-----------------------------------------------------*/
          return (
            <>
              <TableRow key={item.id}>
                <TableCell sx={{ border: 1 }} colSpan="100%">
                  <Controller name="level" control={control}
                    render={({ field: { onChange, value }, formState }) => (
                      <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                        <TextField disabled={false} id="level" label="Piso" type="text" onChange={onChange} defaultValue={rows[index]?.level} {...register(`floor[${index}].level`)} InputLabelProps={{ shrink: true }} sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}></TextField>
                      </Box>
                    )}
                  ></Controller>
                  <Controller name="apartment_groups" control={control}
                    render={({ field: { onChange, value }, formState }) => (
                      <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                        <TextField id="apartment_groups" label="Configuracion Departamentos" type="text" onChange={onChange} InputLabelProps={{ shrink: true }} sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}></TextField>
                      </Box>
                    )}
                  ></Controller>
                  <Controller name="square_meters_surface" control={control}
                    render={({ field: { onChange, value }, formState }) => (
                      <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                        <TextField id="square_meters_surface" label="Metros Cuadrados" type="text" onChange={onChange} {...register(`floor[${index}].square_meters_surface`)} InputLabelProps={{ shrink: true }} sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }}></TextField>
                      </Box>
                    )}
                  ></Controller>
                  <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                    <Controller
                      control={control}
                      name={`floor[${index}].copy`}
                      render={({ field: { onChange, value } }) => (
                        <FormControl sx={{ display: 'inline-flex', flexGrow: 1, "& .MuiInputBase-root": { height: 50, borderRadius: '12px' }, "& .MuiInputBase-input": { fontFamily: 'Roboto', fontSize: 14, } }} >
                          <InputLabel shrink={true}>Copiar Familias</InputLabel>
                          <Select disabled onChange={onChange} value={value} autowidth='true'
                            sx={{ display: 'inline-flex', width: 200 }}
                          >
                            {generateSearchFloorOptions()}
                          </Select>
                        </FormControl>
                      )}
                    /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <ButtonComponent disabled={isLocked} onClick={handleSubmit((data) => { loadApartments(data, floorNumber), unlockFamily() })} color="success" variant="contained" > Agregar Piso </ButtonComponent>&nbsp;&nbsp;
                    <ButtonComponent  onClick={handleSubmit((data) => { updateFloorData(data, floorNumber) })} variant="contained" color="warning"> Editar tipo </ButtonComponent>
                  </Box>
    {/*               <Box sx={{ p: 1, m: 1, display: 'inline-flex', flexGrow: 1 }}>
                    <ButtonComponent  onClick={handleSubmit((data) => { updateFloorData(data, floorNumber) })} variant="contained" color="warning"> Editar tipo </ButtonComponent>
                  </Box> */}
                </TableCell>
              </TableRow>
              <TableRow style={{ background: 'rgb(24 144 255 / 20%)', "height": '35px' }}>
                <TableCell sx={{ border: 1, height: 20 }}>
                  <h2 sx={{ height: 20 }}> Piso&nbsp;{rows[index]?.level}</h2>
                </TableCell>
                {copyFloor[floorNumber+1]?.apartment_groups?.map((i, indice) => {
                  const id = i.id;
                  return (
                    <>
                      <TableCell sx={{ border: 1, borderRight: 0, width: 200 }} key={i.id}>
                        <input hidden placeholder="id" label="id"  {...register(`floor[${index}].apartment[${indice}].id`)} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, width: 80 }, }} defaultValue={i.apartment_group} />
                        <TextField placeholder="depto" label="Depto." InputLabelProps={{ shrink: true, style: { color: '#000000', background: '#d1e7ff' }, root: { color: '#42f595' } }} {...register(`floor[${index}].apartment[${indice}].apartment_number`)} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, width: 80 }, "MuiInputLabel-root": { color: 'red' } }} defaultValue={i.apartment_number}></TextField>
                      </TableCell>
                      <TableCell sx={{ border: 1, borderLeft: 0, width: 200 }}>
                        {/* <input disabled placeholder={i.id} {...register(`floor[${index}].apartment_cto_group[${indice}]`, { value: parseInt(i.id) })} value={id} defaultValue={id} />*/}
                        {/*<input hidden disabled placeholder={i.apartment_number} />*/}
                        <TextField placeholder="Tipo" label="Tipo" InputLabelProps={{ shrink: true, style: { color: '#000000', background: '#d1e7ff' } }} {...register(`floor[${index}].apartment[${indice}].apartment_type`)} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" }, "& .MuiInputBase-root": { height: 30, width: 80 }, }} defaultValue={i.apartment_type} />
                      </TableCell>
                    </>
                  )
                })}
                <TableCell sx={{ border: 1 }} >TOTAL</TableCell>
                <TableCell colSpan='100%' sx={{ border: 1 }}>
                  <Stack direction="row" justifyContent="end">
                    {/*<ButtonComponent onClick={() => { remove(index), deleteFloor(floorNumber) }} color='error' tooltip={`Eliminar Piso `}><MinusCircleOutlined /></ButtonComponent>

                    <ButtonComponent onClick={ handleSubmit((data) =>{deleteFloor(data, floorNumber), remove(index)} )}color='error' tooltip={`Eliminar Piso `}><MinusCircleOutlined /></ButtonComponent>*/}
                    <ButtonComponent onClick={handleSubmit((data) => { deleteFloor(data, floorNumber) })} color='error' tooltip={`Eliminar piso`}><MinusCircleOutlined /></ButtonComponent>
                  </Stack>
                </TableCell>
              </TableRow>
              <FamiliesArray
                floorIndex={index}
                familyState={true}
                {...{ control, register, errors, handleSubmit, submitFloor, floorNumber, setValue, putFloor, reset, deleteFamily, familyLock, setFamilyLock }}
              />
              <TableRow>
              </TableRow>
            </>
          );
        };
      })}
      <ButtonComponent onClick={() => { append(), cargarDatos() }}>AGREGAR SIGUIENTE PISO</ButtonComponent>
    </>
  )
}