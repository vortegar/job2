// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: "",
        apartment_groups: [
            { apartment_type: "", apartment_number: "", ctos: [0] }
        ],
        level: "",
        square_meters_surface: "0",
    }
]

const copyFloorSlice = createSlice({
    name: 'copyCubageSections',
    initialState,
    reducers: {
        addCopyCubageFloor: (state, action) => {
            const id = action.payload.cubication_section;
            const existingFloor = state.find(group => group.cubication_section === id);
            if (!existingFloor) {
                state.push(action.payload);
            }
        },
        updateCopyCubageFloor: (state, action) => {
            const {id, apartment_groups, level, square_meters_surface} = action.payload;
            const existingFloor = state.find(group => group.cubication_section === id);
            if(existingFloor) {
                existingFloor.level = level;
                existingFloor.square_meters_surface = square_meters_surface
            }
        },
        deleteCopyCubageFloor: (state, action) => {
            const id = action.payload;
            const existingFloor = state.find(floor => floor.id === id);
            if (existingFloor) {
                return state.filter(floor => floor.id !== id);
            }
        },
        restoreCopyCubageFloor: (state, action) => {

            const initialState = [
                {
                    id: "",
                    apartment_groups: [
                        { apartment_type: "", apartment_number: "", ctos: [0] }
                    ],
                    level: "",
                    square_meters_surface: "0",
                }
            ];
            return state = initialState;

        }
    }
})

export const { addCopyCubageFloor, updateCopyCubageFloor, deleteCopyCubageFloor, restoreCopyCubageFloor } = copyFloorSlice.actions;
export default copyFloorSlice.reducer;