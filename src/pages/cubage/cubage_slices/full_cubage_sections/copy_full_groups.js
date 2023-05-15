// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: "",
        material_family: {
        },
        cubication_section: 0,
        materias: [],
        isRemove: false
    }
]

const copyMaterialsGroups = createSlice({
    name: 'copyMaterialsGroups',
    initialState,
    reducers: {
        addCopyMaterialsGroups: (state, action) => {
            const { id } = action.payload;
            const existingGroup = state.find(group => group.id === id);
            if (!existingGroup) {
                state.push(action.payload);
            }
        },
        updateCopyMaterialGroups: (state, action) => {
            const {id, materias, isRemove} = action.payload;
            const existingGroup = state.find(group => group.id === id);
            if (existingGroup) {
                existingGroup.materias = materias;
                existingGroup.isRemove = isRemove;
            }
        },
        deleteCopyMaterialGroups: (state, action) => {
            const id = action.payload;
            const existingGroup = state.find(group => group.id === id);
            if (existingGroup) {
                return state.filter(group => group.id !== id);
            }
        },
        deleteCopyMaterialGroupsByCubicationSection: (state, action) => {
            const cubication_section = action.payload;
            const existingGroup = state.find(group => group.cubication_section === cubication_section);
            if(existingGroup) {
                return state.filter(group => group.cubication_section !== cubication_section);
            }
        },
        restoreCopyMaterialGroups: (state, action) => {
            const initialState = [
                {
                    id: "",
                    material_family: {
                    },
                    materias: []
                }
            ];
            return state = initialState;
        }
    }
})

export const { addCopyMaterialsGroups, updateCopyMaterialGroups, deleteCopyMaterialGroups, deleteCopyMaterialGroupsByCubicationSection, restoreCopyMaterialGroups } = copyMaterialsGroups.actions;
export default copyMaterialsGroups.reducer;