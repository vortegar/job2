// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '',
        name: '',
    }
]

const provinces = createSlice({
    name: 'provinces',
    initialState,
    reducers: {
        addProvince: (state, action) => {
            const { id } = action.payload;
            const existingProvince = state.find(province => province.id === id);
            if (!existingProvince) {
                state.push(action.payload);
            }
        }
    }
})

export const { addProvince } = provinces.actions;
export default provinces.reducer;