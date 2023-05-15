// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '',
        project: '',
        apartment_groups: [{}]
    }
];

const apartmentSlice =  createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        addApartments: (state, action) => {
            const {id} = action.payload;
            const existingApartment = state.find(apartment => apartment.id === id);
            if(!existingApartment) {
                state.push(action.payload);
            }
        },
        deleteApartment: (state, action) => {
            
        }
    }
})