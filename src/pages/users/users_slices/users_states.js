// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// STATES SLICE AND REDUCERS CONFIGURATION
const userStates = createSlice({
    name: 'userStates',
    initialState: {
        isNew: true,
        open: false,
        openView: false,
        openAlert: false,
        id: '',
        disabledButton: false,
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
    }
})


export const { setIsNew, setOpen, setOpenView, setOpenAlert, setId, setExisting, setDisabledButton } = userStates.actions;
export default userStates.reducer;