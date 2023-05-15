// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const providerStates = createSlice ({
    name: 'providersStates',
    initialState: {
        isNew: true,
        open: false,
        openView: false,
        openAlert: false,
        id: '',
        disabledButton: true,
        downloadView: false,
        filterView: false,
        uploadView: false,
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
        setDownloadView: (state, action) => {
            state.downloadView = action.payload;
        },
        setFilterView: (state, action) => {
            state.filterView = action.payload;
        },
        setUploadView: (state, action) => {
            state.uploadView = action.payload;
        },
    }
})


export const { setIsNew, setOpen, setOpenView, setOpenAlert, setId, setDisabledButton, setDownloadView, setFilterView, setUploadView } = providerStates.actions;
export default providerStates.reducer;