// AXIOS IMPORT
import instance from 'services/axios_config';

import { addCubageFloor, deleteCubageFloor } from '../cubage_slices/full_cubage_sections/cubage_floor_slice';

// DATA POST TO API
export const postCubageFloor = (data, id) => {
    instance.post(`full_cubage_sections/`, {
        apartment_groups: data?.apartment_groups,
        level: data?.level,
        square_meters_surface: data?.square_meters_surface,
        cubication: id
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        })
}

