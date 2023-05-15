// REACT IMPORTS
import { createSlice } from '@reduxjs/toolkit';

const totalizationSlice = createSlice({
    name: 'totalization',
    initialState:{
        list:[{
            "id":"" ,
            "material_group_material": [
                {
                    "material_family": "",
                    "family_materials": [
                        {
                            "material_id": "",
                            "material_code": "",
                            "material_name": "",
                            "material_measure_unit": "",
                            "material_levels": [
                                [
                                    {
                                        "material_id": "" ,
                                        "material_name": "",
                                        "material_level": "",
                                        "material_qty":0,
                                        "total": 0
                                    }
                                ],
                                [
                                    {
                                        "material_id": 0,
                                        "material_name": "",
                                        "material_level": "",
                                        "material_qty": 0,
                                        "total": 0
                                    }
                                ]
                            ]
                        },
                        {
                            "material_id": 0,
                            "material_code": "",
                            "material_name": "",
                            "material_measure_unit": "",
                            "material_levels": [
                                [
                                    {
                                        "material_id": 0,
                                        "material_name": "",
                                        "material_level": "",
                                        "material_qty": 0,
                                        "total": 0
                                    }
                                ],
                                [
                                    {
                                        "material_id": 0,
                                        "material_name": "",
                                        "material_level": "",
                                        "material_qty": 0,
                                        "total": 0
                                    }
                                ]
                            ]
                        }
                    ]
                }
            ],
            "activity": "",
            "start_date": "",
            "end_date": "",
            "status": "",
            "created_at": "",
            "updated_at": "",
            "data_sheet": {
                "id": 0,
                "project_number": "",
                "project_title": "",
                "principal_name": "",
                "address": "",
                "status": "",
                "created_at": "",
                "updated_at": "",
                "version": 0,
                "province": {
                    "id": 0,
                    "name": "",
                    "created_at": "",
                    "updated_at": "",
                    "region": 0
                },
                "commune": {
                    "id": 0,
                    "name": "",
                    "created_at": "",
                    "updated_at": "",
                    "province": 0
                },
                "cubicator": 0,
                "supervised_by": 0,
                "created_by": ""
            },
            "created_by": {
                "id": 0,
                "full_name": ""
            },
            "supervised_by": null,
            "cubicator": null,
            "levels": [
                {
                    "id": 0,
                    "level": "",
                    "square_meters_surface": "",
                    "created_at": "",
                    "updated_at": "",
                    "cubication": 0
                },
                {
                    "id": 0,
                    "level": "",
                    "square_meters_surface": "",
                    "created_at": "",
                    "updated_at": "",
                    "cubication": 0
                }
            ]
        }],
    },
    reducers: {
        reducerTotalization:( state ,action) =>{ 
            state.list = action.payload
        },
    }
});


export const { reducerTotalization } = totalizationSlice.actions;
export default totalizationSlice.reducer;

