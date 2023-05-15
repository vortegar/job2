// AXIOS IMPORT
import instance from 'services/axios_config';
import { reducerTotalization } from '../totalizacion_slice/totalization_slice';

export const getTotalization = (id) => (dispatch)=>{
    instance.get('cubage-totals/'+id+'/')
    .then((res)=>{
        // console.log(res)
        dispatch(reducerTotalization(res.data))
    }).catch((res)=>{
        console.log(res);
    })
}

// export const uploadFile = (params, id) =>(dispatch)=>{
//     instance.post('data_sheet_files/',params)
//     .then((res)=>{ 
//         console.log(id)
//         dispatch(listFileProject(id))
//     }).catch((res)=>{
//         console.log(res);
//     })
// }

