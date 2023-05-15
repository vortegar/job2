// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// DEMO DATA INITIAL STATE
const initialState = [
    
];

const providersSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        addProvider: (state, action) => {
            const { id } = action.payload;
            const existingProvider = state.find(provider => provider.id === id);
            if (!existingProvider) {
                state.push(action.payload);
            }
        },
        editProvider: (state, action) => {
            const {
                id,
                name,
                social_reason,
                rut,
                address,
                extra_address,
                phone,
                seller_full_name,
                seller_email,
                country,
                region,
                region_id,
                province,
                province_id,
                commune,
                commune_id,
                speciality,
                speciality_id,
                product_type,
                product_type_id,
                payment_method,
                payment_method_id,
            } = action.payload;
            const existingProvider = state.find(provider => provider.id === id);
            if (existingProvider) {
                existingProvider.name = name;
                existingProvider.social_reason = social_reason;
                existingProvider.rut = rut;
                existingProvider.address = address;
                existingProvider.extra_address = extra_address;
                existingProvider.phone = phone;
                existingProvider.seller_full_name = seller_full_name;
                existingProvider.seller_email = seller_email;
                existingProvider.country = country;
                existingProvider.region = region;
                existingProvider.region_id = region_id;
                existingProvider.province = province;
                existingProvider.province_id = province_id;
                existingProvider.commune = commune;
                existingProvider.commune_id = commune_id;
                existingProvider.speciality = speciality;
                existingProvider.speciality_id = speciality_id;
                existingProvider.product_type = product_type;
                existingProvider.product_type_id = product_type_id;
                existingProvider.payment_method = payment_method;
                existingProvider.payment_method_id = payment_method_id;
            }
        },
        deleteProvider: (state, action) => {
            const { id } = action.payload;
            const existingProvider = state.find(provider => provider.id === id);
            if (existingProvider) {
                return state.filter(provider => provider.id !== id);
            }
        },
        restoreProvider: (state,action) => {
            const initialState = [
               
            ];
            return state = initialState;
        }
    }
});


export const { addProvider, editProvider, deleteProvider, restoreProvider } = providersSlice.actions;
export default providersSlice.reducer;