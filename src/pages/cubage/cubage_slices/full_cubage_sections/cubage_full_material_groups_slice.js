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

const fullMaterialsGroups = createSlice({
    name: 'fullMaterialsGroups',
    initialState,
    reducers: {
        addMaterialsGroups: (state, action) => {
            const { id } = action.payload;
            const existingGroup = state.find(group => group.id === id);
            if (!existingGroup) {
                state.push(action.payload);
            }
        },
        updateMaterialGroups: (state, action) => {
            const {id, materias} = action.payload;
            const existingGroup = state.find(group => group.id === id);
            if (existingGroup) {
                existingGroup.materias = materias;
            }
        },
        updateMaterialGroupsRemove: (state, action) => {
            const {id, materias, isRemove} = action.payload;
            const existingGroup = state.find(group => group.id === id);
            if (existingGroup) {
                //existingGroup.materias = materias;
                existingGroup.isRemove = isRemove;
            }
        },
        deleteMaterialGroups: (state, action) => {
            const id = action.payload;
            const existingGroup = state.find(group => group.id === id);
            if (existingGroup) {
                return state.filter(group => group.id !== id);
            }
        },
        deleteMaterialGroupsByCubicationSection: (state, action) => {
            const cubication_section = action.payload;
            const existingGroup = state.find(group => group.cubication_section === cubication_section);
            if(existingGroup) {
                return state.filter(group => group.cubication_section !== cubication_section);
            }
        },
        restoreMaterialGroups: (state, action) => {
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

export const { addMaterialsGroups, deleteMaterialGroups, restoreMaterialGroups, updateMaterialGroups, deleteMaterialGroupsByCubicationSection, updateMaterialGroupsRemove } = fullMaterialsGroups.actions;
export default fullMaterialsGroups.reducer;