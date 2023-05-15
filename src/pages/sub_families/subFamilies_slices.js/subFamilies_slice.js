// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE MODEL CONFIGURATION
const initialState = [

];

const subFamiliesSlice = createSlice({
    name: 'subFamilies',
    initialState,
    reducers: {
        addSubFamily: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.find(subFamily => subFamily.id === id);
            if (!existingProduct) {
                state.push(action.payload);
            }
        },
        editSubFamily: (state, action) => {
            const {
                id,
                name,
                description,
                material_family,
            } = action.payload;
            const existingProduct = state.find(subFamily => subFamily.id === id);
            if (existingProduct) {
                existingProduct.name = name;
                existingProduct.description = description;
                existingProduct.material_family = material_family;
            }
        },
        deleteSubFamily: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.find(subFamily => subFamily.id === id);
            if (existingProduct) {
                return state.filter(subFamily => subFamily.id !== id);
            }
        },
        restoreSubFamily: (state, action) => {
            const initialState = [

            ];
            return state = initialState;
        }
    }
})

export const { addSubFamily, editSubFamily, deleteSubFamily, restoreSubFamily } = subFamiliesSlice.actions;
export default subFamiliesSlice.reducer;