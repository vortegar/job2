// AXIOS IMPORT
import instance from 'services/axios_config';
import { reducerListProjects, reducerDeleteProject, reducerListFile } from '../projects_slices/projects_slice';

export const getListProjects =  (filters)=> (dispatch) => {

    let f ={}
        filters?.project_number? f.project_number=filters?.project_number : f.project_number=''
        filters?.project_title? f.project_title=filters?.project_title : f.project_title=''
        filters?.status? f.status=filters?.status : f.status=''
        filters?.principal_name? f.principal_name=filters?.principal_name : f.principal_name=''
        filters?.address? f.address=filters?.address : f.address=''
    
    instance.get('data_sheets/?limit=100&project_title='+f?.project_title+'&project_number='+f?.project_number+'&status='+f?.status+'&principal_name='+f?.principal_name+'&address='+f?.address)
        .then((data) => {
            const projects = data.data?.results;
            dispatch(reducerListProjects(projects))
        })
        .catch((error) => {
            console.error(error);
        })
}

export const deleteProject = (id) => (dispatch) => {
    instance.delete('data_sheets/'+id+'/')
    .then((res)=>{
        //console.log(res)
        dispatch(reducerDeleteProject(id))
    }).catch((err)=>{
        console.log(err);
    })
}

export const downloadExcel = (id)=> {
    instance.get('data-sheets-reports/'+id+'/',{responseType: 'blob'})
    .then((res)=>{
        const href = URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'ficha.pdf'); 
        document.body.appendChild(link);
        link.click();
    }).catch((res)=>{
        // console.log(res);
    }) 
}

export const listFileProject = (id) => (dispatch)=>{
    instance.get('data_sheets/'+id+'/')
    .then((res)=>{
        //console.log(res)
        dispatch(reducerListFile(res.data.files))
    }).catch((res)=>{
        console.log(res);
    })
}

export const uploadFile = (params, id) =>(dispatch)=>{
    instance.post('data_sheet_files/',params)
    .then((res)=>{ 
        //console.log(id)
        dispatch(listFileProject(id))
    }).catch((res)=>{
        console.log(res);
    })
}

