// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
    name: 'projects',
    initialState:{
        list:[],
        listFile:[],
    },
    reducers: {
        reducerListProjects:( state ,action) =>{ 
            state.list = action.payload
        },
        reducerDeleteProject: (state, action) => {
            state.list = state.list.filter( a => a.id != action.payload)
        },
        createSlaceProject: (state, action) => {
            let data = action.payload
            data.id = state.length + 1  
            state.push(data);
        },
        reducerViewProject:(state, action)=>{
            // console.log(action.payload)
        },
        reducerListFile:(state,action)=>{
            state.listFile = action.payload
        },
        
    }
});


export const { reducerListProjects, reducerDeleteProject, createSlaceProject, reducerViewProject, reducerListFile } = projectsSlice.actions;
export default projectsSlice.reducer;

