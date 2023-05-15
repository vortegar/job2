import instance from 'services/axios_config';
import { addCubicatorUser, deleteCubicatorUser } from '../cubage_slices/cubage_users/cubage_cubicator_user';
import { addSupervisorUser, deleteSupervisorUser } from '../cubage_slices/cubage_users/cubage_users';
import { addCubageProject } from '../cubage_slices/full_cubage_sections/cubageProjects_slice';

// DATA GET FROM API
export const getUserSupervisorData = (dispatch, deleteId) => {
    instance.get('users/?groups=3')
        .then((data) => {
            const user = data.data?.results;
            user.map((user) => {
                let { id, first_name, last_name, email, password, rut, groups } = user;
                dispatch(addSupervisorUser({
                    id: id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    rut: rut,
                    groups: groups,
                }));
            });
            dispatch(deleteSupervisorUser({ id: deleteId }));
        })
        .catch((error) => {
            console.error(error);
        })
}

export const getUserCubicatorData = (dispatch, deleteId) => {
    instance.get(`users/?groups=2`)
    .then((data) => {
        const user = data?.data?.results;
        user.map((user) => {
            let { id, first_name, last_name, email, password, rut, groups } = user;
            dispatch(addCubicatorUser({
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                rut: rut,
                groups: groups,
            }));
        });
        dispatch(deleteCubicatorUser({ id: deleteId }));
    })
    .catch((error) => {
        console.error(error);
    })
}


