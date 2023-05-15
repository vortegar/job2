import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const productTypeSlice = createSlice({
  name: 'productType',
  initialState,
  reducers: {
    addProductType: (state, action) => {
      console.log('add')
    },
    updateProductType: (state, action) => {
      console.log('update')
    },
    deleteProductType: (state, action) => {
      console.log('delete')
    }
  }
})

export const { addProductType, updateProductType, deleteProductType } = productTypeSlice.actions;
export default productTypeSlice.reducer;