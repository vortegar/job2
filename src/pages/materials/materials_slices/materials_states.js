// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// STATES SLICE AND REDUCERS CONFIGURATION
const isNewSlice = createSlice({
    name: 'productsStates',
    initialState: {
        isNew: true,
        open: false,
        openView: false,
        openAlert: false,
        isLoading: true,
        id: null,
        disabledButton: true,
        filterView: false,
        message: false,
        existing: {
            id: 'dfasd',
            company_id: '',
            product_family_id: '',
            product_subfamily_id: '',
            title: '',
            description: '',
            unit_cost: '',
            retail_sell_price: '',
            wholesaler_sell_price: '',
            sku: '',
            barcode: '',
            locked_stock: 0,
            available_stock: 0,
            future_stock: 0
        },

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
        setExisting: (state, action) => {
            state.existing.id = action.payload.id;
        },
        setFilterView: (state, action) => {
            state.filterView = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },    
        setMessage: (state, action) => {
            state.message = action.payload
        }    

    }
})
export const { setIsNew, setOpen, setOpenView, setOpenAlert, setId, setExisting, setDisabledButton, setFilterView, setMessage } = isNewSlice.actions;

export default isNewSlice.reducer;