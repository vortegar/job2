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

const cubicatorSlice = createSlice({
    name: 'cubicatorSlice',
    initialState,
    reducers: {
        addCubicatorUser: (state, action) => {
            const { id } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (!existingUser) {
                state.push(action.payload);
            }
        },
        deleteCubicatorUser: (state, action) => {
            const { id } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (existingUser) {
                return state.filter(user => user.id !== id);
            }
        }
    }
})

export const { addCubicatorUser, deleteCubicatorUser} = cubicatorSlice.actions;
export default cubicatorSlice.reducer;