// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE MODEL CONFIGURATION
const initialState = [

]

// STATES SLICE AND REDUCERS CONFIGURATION
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { id } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (!existingUser) {
                state.push(action.payload);
            }
        },
        editUser: (state, action) => {
            const {
                id,
                first_name,
                last_name,
                email,
                password,
                rut,
                groups,
            } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (existingUser) {
                existingUser.first_name = first_name;
                existingUser.last_name = last_name;
                existingUser.email = email;
                existingUser.password = password;
                existingUser.rut = rut;
                existingUser.groups = groups;
            }
        },
        deleteUser: (state, action) => {
            const { id } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (existingUser) {
                return state.filter(user => user.id !== id);
            }
        },
        restoreUser: (state, action) => {
            const initialState = [

            ]
            return state = initialState;
        }
    }
})

export const { addUser, editUser, deleteUser, restoreUser } = usersSlice.actions;
export default usersSlice.reducer;
