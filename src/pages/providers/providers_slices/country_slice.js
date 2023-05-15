// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '',
        name: '',
    }
]

const countries = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        addCountry: (state, action) => {
            const { id } = action.payload;
            const existingCountry = state.find(country => country.id === id);
            if (!existingCountry) {
                state.push(action.payload);
            }
        }
    }
})

export const { addCountry } = countries.actions;
export default countries.reducer;