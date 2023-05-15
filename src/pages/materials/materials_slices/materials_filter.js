// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const materialsFilters = createSlice({
    name: 'materialsFilters',
    initialState: {
        familyFilter: '',
        subFamilyFilter: '',
    },
    reducers: {
        setFamilyFilter: (state, action) => {
            state.familyFilter = action.payload;
        },
        setSubFamilyFilter: (state, action) => {
            state.subFamilyFilter = action.payload;
        },
    }
})

export const { setFamilyFilter, setSubFamilyFilter } = materialsFilters.actions;
export default materialsFilters.reducer;