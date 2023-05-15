// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const cubageFormStates = createSlice ({
    name: 'cubageFormStates',
    initialState: {
        disabledButton: true,
        open: false,
        current: [],
        isLoading: true,
        deleteFloorId: null,
        confirmOpen: false,
        familyLock: true,
    },
    reducers: {
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload;
        },
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
        setIsLoading:(state, action) => {
            state.isLoading = action.payload;
        },
        setDeleteFloorId: (state, action) => {
            state.deleteFloorId = action.payload;
        },
        setConfirmOpen: (state, action) => {
            state.confirmOpen = action.payload;
        },
        setFamilyLock: (state, action)=> {
            state.familyLock = action.payload;
        }
    }
})


export const { setOpen, setDisabledButton, setCurrent, setIsLoading, setDeleteFloorId, setConfirmOpen, setFamilyLock } = cubageFormStates.actions;
export default cubageFormStates.reducer;