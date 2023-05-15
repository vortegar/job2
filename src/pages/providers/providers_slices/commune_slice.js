// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '',
        name: '',
        province: ''
    }
]

const communes = createSlice({
    name: 'communes',
    initialState,
    reducers: {
        addCommune: (state, action) => {
            const { id } = action.payload;
            const existingCommune = state.find(commune => commune.id === id);
            if (!existingCommune) {
                state.push(action.payload);
            }
        }
    }
})

export const { addCommune } = communes.actions;
export default communes.reducer;