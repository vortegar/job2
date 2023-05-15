// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE MODEL CONFIGURATION
const initialState = [
    {
        id: '',
        activity: '',
        start_date: '',
        end_date: '',
        status: '',
        data_sheet: '',
        project_title: '',
        created_by: '',
        created_by_name: '',
        supervised_by: '',
        cubicator: '',
    }
];
        
const cubageProjectsSlice = createSlice({
    name: 'cubageProjects',
    initialState,
    reducers: {
        addCubageProject: (state, action) => {
            const { id } = action.payload;
            const existingProject = state.find(project => project.id === id);
            if (!existingProject) {
                state.push(action.payload);
            }
        },
        editCubageProject: (state, action) => {
            const {
                id,
                project,
                activity,
                start_date,
                ending_date,
                cubicator,
                data_sheet,
            } = action.payload;
            const existingProject = state.find(project => project.id === id);
            if (existingProject) {
                existingProject.project = project;
                existingProject.activity = activity;
                existingProject.start_date = start_date;
                existingProject.ending_date = ending_date;
                existingProject.cubicator = cubicator;
                existingProject.data_sheet = data_sheet;
            }
        },
        deleteCubageProject: (state, action) => {
            const { id } = action.payload;
            const existingProject = state.find(project => project.id === id);
            if (existingProject) {
                return state.filter(project => project.id !== id);
            }
        },
        restoreCubageProject: (state, action) => {
            const initialState = [
                {
                    id: '',
                    activity: '',
                    start_date: '',
                    end_date: '',
                    status: '',
                    data_sheet: '',
                    project_title: '',
                    created_by: '',
                    created_by_name: '',
                    supervised_by: '',
                    cubicator: '',
                }
            ];
            return state = initialState;
        }
    }
})

export const {addCubageProject, editCubageProject, deleteCubageProject, restoreCubageProject} = cubageProjectsSlice.actions;
export default cubageProjectsSlice.reducer;