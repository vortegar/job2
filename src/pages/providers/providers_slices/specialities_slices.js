import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listSpecialities: []
}

export const specialitiesSlice = createSlice({
  name: 'specialities',
  initialState,
  reducers: {
    fillSpecialities:(state, action) => {
      console.log(action.payload)
      state.listSpecialities.push(action.payload)
    },
    addSpecialty:(state, action) => {
      console.log(action)
    },
    updateSpecialty:(state, action) => {
      console.log(action)
    },
    deleteSpecialty: (state, action) => {
      console.log('delete')
    },
    clearState:(state, action) => {
      console.info('clear')
      
    }
  }
})

export const { fillSpecialities, addSpecialty, updateSpecialty, clearState } = specialitiesSlice.actions;
export default specialitiesSlice.reducer;