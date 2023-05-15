// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const acquisitionSlice = createSlice({
    name: 'acquisition',
    initialState:[],
    reducers: {
        reducerAcquisition:( state ,action) => { 
            //state.list = action.payload
            state.push(action.payload)
        },
    }
});


export const { reducerAcquisition } = acquisitionSlice.actions;
export default acquisitionSlice.reducer;