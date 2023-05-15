// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '',
        name: '',
    }
]

const regions = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        addRegion: (state, action) => {
            const { id } = action.payload;
            const existingRegion = state.find(region => region.id === id);
            if (!existingRegion) {
                state.push(action.payload);
            }
        }
    }
})


export const { addRegion } = regions.actions;
export default regions.reducer;