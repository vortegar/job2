import instance from 'services/axios_config';

// UI IMPORTS
import { ToastContainer, toast } from 'react-toastify';

// REDUX IMPORTS
import { setCurrent } from '../cubage_slices/cubage_states/cubage_form_states';
import { addCubageFloor, deleteCubageFloor } from '../cubage_slices/full_cubage_sections/cubage_floor_slice';
import { addMaterialsGroups, deleteMaterialGroups } from '../cubage_slices/full_cubage_sections/cubage_full_material_groups_slice';
import { addCopyCubageFloor } from '../cubage_slices/full_cubage_sections/copy_floor_slice';
import { addCopyMaterialsGroups } from '../cubage_slices/full_cubage_sections/copy_full_groups';



export const getCubicationData = (dispatch, cid, deleteId) => {
  instance.get(`cubications/${cid}/`)
    .then((data) => {
      dispatch(setCurrent(data.data));
      dispatch(deleteCubageFloor(deleteId));
    });
}

export const postFullCubageSections = (dispatch, cid, level, square_meters_surface, deptos, deleteId, copyNumber, copyFamilies) => {
  instance.post(`full_cubage_sections/`, {
    cubication: cid,
    level: level,
    square_meters_surface: square_meters_surface,
    apartment_groups: deptos,
  }).then((response) => {
    // RESPONSE DATA ASSIGN
    const cubication_section = response?.data?.id;
    const respAparts = response?.data?.apartment_groups;
    let deptosRes = []
    respAparts.map((apar) => {
      deptosRes.push({ id: apar?.apartment_cto_groups[0]?.id, apartment_type: apar.apartment_type, apartment_number: apar.apartment_number, apartment_group: apar?.apartment_cto_groups[0]?.apartment_group });
    })
    dispatch(addCubageFloor({ id: cid, apartment_groups: deptosRes, level: level, square_meters_surface: square_meters_surface, cubication_section: cubication_section, isNew: true }))
    dispatch(addCopyCubageFloor({ id: cid, apartment_groups: deptosRes, level: level, square_meters_surface: square_meters_surface, cubication_section: cubication_section, isNew: true }))
    dispatch(deleteCubageFloor(deleteId));
    if (copyNumber != undefined) {
      //console.log("existe copyNumber y los datos son", copyFamilies);
      copyFamilies.map((datt, index) => {
        //console.log("dato", datt);
        const materias = datt.materias;
        const material_family = datt.material_family;
        dispatch(addMaterialsGroups({ id: index, material_family: material_family, cubication_section: cubication_section, materias: materias }))
      })
    }
    toast.success("Piso Cargado correctamente");
  }).catch((error) => {
    console.error(error);
    toast.error("Error al cargar Piso");
  })
}

// SUBMIT CUBAGE FAMILY DATA
export const postFullMaterialGroups = (dispatch, cubication_section, material_family, materials, deleteId) => {
  instance.post(`full_material_groups/`, {
    cubication_section: cubication_section,
    material_family: material_family,
    materials: materials
  }).then((response) => {
    //console.log("response al cargar familia", response);
    const materias = response?.data?.materials;
    const material_family = response?.data?.material_family;
    const id = response?.data?.id;
    const cubication_section = response?.data?.cubication_section;
    toast.success("Familia cargada")
    // este dispatch genera un bug al momento de crear un nuevo piso
    //dispatch(addMaterialsGroups({ id: id, material_family: material_family, materias: materias }))
    //dispatch(addCopyCubageFloor({ id: id, material_family: material_family, materias: materias }))
    dispatch(addCopyMaterialsGroups({ id: id, material_family: material_family, materias: materias, cubication_section: cubication_section }))
    dispatch(addMaterialsGroups({ id: id, material_family: material_family, materias: materias, cubication_section: cubication_section }))
    dispatch(deleteMaterialGroups(deleteId));
  }).catch((error) => {
    console.error(error)
    toast.error("Error al cargar familia")
  })
}

// GET ALL CUBICATION DATA 
export const getAllCubageData = () => {
  
}