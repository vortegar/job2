// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE MODEL CONFIGURATION
const initialState = [

];

const familiesSlice = createSlice({
    name: 'families',
    initialState,
    reducers: {
        addFamily: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.find(family => family.id === id);
            if (!existingProduct) {
                state.push(action.payload);
            }
        },
        editFamily: (state, action) => {
            const {
                id,
                name,
                description,
            } = action.payload;
            const existingProduct = state.find(family => family.id === id);
            if (existingProduct) {
                existingProduct.name = name;
                existingProduct.description = description;
            }
        },
        deleteFamily: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.find(family => family.id === id);
            if (existingProduct) {
                return state.filter(family => family.id !== id);
            }
        },
        restoreFamily: (state, action) => {
            const initialState = [
       
            ];
            return state = initialState;
        }
    }
})

export const { addFamily, editFamily, deleteFamily, restoreFamily } = familiesSlice.actions;
export default familiesSlice.reducer;