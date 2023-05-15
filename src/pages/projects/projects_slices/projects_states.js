// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

var items_total = [
    {
      label: "N°SUBTERRANEOS",
      value: 1
  },
  {
      label: "N°DEPTOS EDIFICIO A",
      value: 1
  },
  {
      label: "N°DEPTOS EDIFICIO B",
      value: 1
  },
  {
      label: "N° LOCALES",
      value: 1
  },
  {
      label: "N° PISOS",
      value: 1
  },
  {
      label: "Nº OFICINA",
      value: 1
  }
  ]

const isNewSlice = createSlice({
    name: 'projectsStates',
    initialState: {
        items_total: items_total,
        isNew: true,
        openView: false,
        openFilter: false,
        openAssignment: false,
    },
    reducers: {
        setIsNew: (state, action) => {
            state.isNew = action.payload;
        },
        setOpenView: (state, action) => {
            state.openView = action.payload;
        },
        setOpenFilter: (state, action) => {
            state.openFilter = action.payload;
        },
        setOpenAssignment: (state, action) => {
            state.openAssignment = action.payload;
        },
        reducer_total_items_Default:(state, action)=>{
            state.items_total = action.payload
        }
    }
})

export const { reducer_total_items_Default, setOpenView, setOpenFilter, setOpenAssignment } = isNewSlice.actions;
export default isNewSlice.reducer;