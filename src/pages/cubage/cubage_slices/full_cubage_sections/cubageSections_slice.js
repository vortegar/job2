// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id : null,
        apartment_groups: [], // arreglo de objetos que incluye numero de departamento y tipo de departamento ex= { id: 1, depto: 0204, tipo: A}
        level: "",
        square_meters_surface: null,
        cubication: null
    }
];

const cubageSectionsSlice = createSlice({
    name: 'cubageSections',
    initialState,
    reducers: {
        addCubageSection: (state, action) => {
            const {id} = action.payload;
            const existingSection = state.find(section => section.id === id);
            if (!existingSection) {
                state.push(action.payload);
            }
        },
        editCubageSection: (state, action) => {
            const {
                id,
                apartment_groups,
                level,
                square_meters_surface,
                cubication,
            } = action.payload;
            const existingSection = state.find(section => section.id === id);
            if (existingSection) {
                existingSection.apartment_groups = apartment_groups;
                existingSection.level = level;
                existingSection.square_meters_surface= square_meters_surface;
                existingSection.cubication = cubication;
            }
        },
        deleteCubageSection: (state, action) => {
            const { id } = action.payload;
            const existingSection = state.find(section => section.id === id);
            if (existingSection) {
                return state.filter(section => section.id !== id);
            }
        }
    }
})

export const {addCubageSection, editCubageSection, deleteCubageSection} = cubageSectionsSlice.actions;
export default cubageSectionsSlice.reducer;

