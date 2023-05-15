// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE MODEL CONFIGURATION
const initialState = [
    {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        rut: '',
        groups: '',
    }
];

const supervisorSlice = createSlice({
    name: 'supervisorSlice',
    initialState,
    reducers: {
        addSupervisorUser: (state, action) => {
            const { id } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (!existingUser) {
                state.push(action.payload);
            }
        },
        deleteSupervisorUser: (state, action) => {
            const { id } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (existingUser) {
                return state.filter(user => user.id !== id);
            }
        }
    }
})

export const { addSupervisorUser, deleteSupervisorUser} = supervisorSlice.actions;
export default supervisorSlice.reducer;