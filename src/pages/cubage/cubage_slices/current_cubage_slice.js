// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE MODEL CONFIGURATION
const initialState = [{
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
}]

        
const currentCubageSlice = createSlice({
    name: 'currentCubage',
    initialState,
    reducers: {
        addCurrentCubage: (state, action) => {
            const { id } = action.payload;
            const existingProject = state.find(project => project.id === id);
            if (!existingProject) {
                state.push(action.payload);
            }
        },
        editCurrentCubage: (state, action) => {
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
        deleteCurrentCubage: (state, action) => {
            const { id } = action.payload;
            const existingProject = state.find(project => project.id === id);
            if (existingProject) {
                return state.filter(project => project.id !== id);
            }
        }
    }
})

export const {addCurrentCubage, editCurrentCubage, deleteCurrentCubage} = currentCubageSlice.actions;
export default currentCubageSlice.reducer;