// REACT IMPORTS
import {createSlice} from '@reduxjs/toolkit';

const subFamiliesFilters = createSlice({
    name: 'subFamiliesFilters',
    initialState:{
        familyFilter: '',
    },
    reducers: {
        setFamilyFilter: (state, action) => {
            state.familyFilter = action.payload;
        },
    }
});

export const { setFamilyFilter } = subFamiliesFilters.actions;
export default subFamiliesFilters.reducer;