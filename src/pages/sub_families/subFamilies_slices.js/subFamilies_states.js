// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// STATES SLICE AND REDUCERS CONFIGURATION
const subFamiliesStates = createSlice({
    name: 'subFamiliesStates',
    initialState: {
        isNew: true,
        open: false,
        openView: false,
        openAlert: false,
        id: '',
        disabledButton: false,
        fitlerView: false,
    },
    reducers: {
        setIsNew: (state, action) => {
            state.isNew = action.payload;
        },
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setOpenView: (state, action) => {
            state.openView = action.payload;
        },
        setOpenAlert: (state, action) => {
            state.openAlert = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload;
        },
        setFilterView: (state, action) => {
            state.filterView = action.payload;
        },
    }
})

export const { setIsNew, setOpen, setOpenView, setOpenAlert, setId, setExisting, setDisabledButton, setFilterView } = subFamiliesStates.actions;
export default subFamiliesStates.reducer;