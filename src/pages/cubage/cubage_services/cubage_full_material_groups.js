import instance from 'services/axios_config';
import { addMaterialsGroups, deleteMaterialGroups } from '../cubage_slices/full_cubage_sections/cubage_full_material_groups_slice';

export const getFullMaterialsGroups = (dispatch) => {
    instance.get(`full_material_groups/`)
        .then((data) => {
            const materialGroups = data.data?.results;
            materialGroups.map((group) => {
                const { id, cubication_section, material_family } = group;
                dispatch(addMaterialsGroups({
                    id: id,
                    cubication_section: cubication_section,
                    material_family: material_family,
                }))
                dispatch(deleteMaterialGroups({id: ''}));
            })
        })
}

export const postFullMaterialGroups = (data, cubication_section) => {
    instance.post('full_material_groups/', {
        cubication_section: data?.cubication_section,
        material_family: data?.material_family,
    })
} 

