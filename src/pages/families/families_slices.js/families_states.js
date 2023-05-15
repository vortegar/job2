// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const familyStates = createSlice({
  name: 'familyStates',
  initialState: {
    isNew: true,
    open: false,
    openView: false,
    openAlert: false,
    openFilter: false,
    id: '',
    disabledButton: true,
    loaded: false
  },
  reducers: {
    setIsNew: (state, action) => {
      state.isNew = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setOpenFilter: (state, action) => {
      state.openFilter = action.payload;
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
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    }
  }
});

export const { setIsNew, setOpen, setOpenView, setOpenAlert, setId, setExisting, setDisabledButton, setLoaded, setOpenFilter } =
  familyStates.actions;
export default familyStates.reducer;
