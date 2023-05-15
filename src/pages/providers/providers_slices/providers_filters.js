// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const providersFilters = createSlice({
    name: 'providersFilters',
    initialState: {
        specialityFilter: '',
        typeFilter: '',
        methodFilter: '',
        regionFilter: '',
        provinceFilter: '',
        communeFilter: '',
    },
    reducers: {
        setSpecialityFilter: (state, action) => {
            //console.log('slice_filter', action)
            state.specialityFilter = action.payload;
        },
        setTypeFilter: (state, action) => {
            state.typeFilter = action.payload;
        },
        setMethodFilter: (state, action) => {
            state.methodFilter = action.payload;
        },
        setRegionFilter: (state, action) => {
            state.regionFilter = action.payload;
        },
        setProvinceFilter: (state, action) => {
            state.provinceFilter = action.payload;
        },
        setCommuneFilter: (state, action) => {
            state.communeFilter = action.payload;
        }
    }
})

export const { setSpecialityFilter, setTypeFilter, setMethodFilter, setRegionFilter, setProvinceFilter, setCommuneFilter } = providersFilters.actions;
export default providersFilters.reducer;