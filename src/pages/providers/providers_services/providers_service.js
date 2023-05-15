// AXIOS IMPORT
import instance from 'services/axios_config';
import { addCommune } from '../providers_slices/commune_slice';
import { addCountry } from '../providers_slices/country_slice';
import { addProvider, deleteProvider } from '../providers_slices/providers_slice';
import { addProvince } from '../providers_slices/province_slice';
import { addRegion } from '../providers_slices/region_slice';
import { fillSpecialities } from '../providers_slices/specialities_slices';


// GET DATA FROM API AND SEND TO THE STORE
export const getProvidersData = (dispatch, deleteId, filters) => {
    if (!filters) {
        return filters = {
            specialityFilter: '',
            typeFilter: '',
            methodFilter: '',
            regionFilter: '',
            provinceFilter: '',
            communeFilter: '',
        }
    }

    instance.get(`providers/?limit=1000&region=${filters.regionFilter}&province=${filters.provinceFilter}&commune=${filters.communeFilter}&speciality=${filters.specialityFilter}&product_type=${filters.typeFilter}&payment_method=${filters.methodFilter}`)
        .then((data) => {
            const providers = data.data?.results;
            providers.map((provider) => {
                const { id,
                    name,
                    social_reason,
                    rut,
                    address,
                    extra_address,
                    phone,
                    seller_full_name,
                    seller_email,
                    region,
                    province,
                    commune,
                    speciality,
                    product_type,
                    payment_method,
                } = provider;
                dispatch(addProvider({
                    id: id,
                    name: name,
                    social_reason: social_reason,
                    rut: rut,
                    address: address,
                    extra_address: extra_address,
                    phone: phone,
                    seller_full_name: seller_full_name,
                    seller_email: seller_email,
                    region: region.name,
                    region_id: region.id,
                    province: province.name,
                    province_id: province.id,
                    commune: commune.name,
                    commune_id: commune.id,
                    speciality: speciality.name,
                    speciality_id: speciality.id,
                    product_type: product_type.name,
                    product_type_id: product_type.id,
                    payment_method: payment_method?.name,
                    payment_method_id: payment_method?.id,
                }))
            });
            dispatch(deleteProvider({ id: deleteId }))
        })
        .catch((error) => {
            console.error(error);
        })
}

export const getCountryData = (dispatch) => {
    instance.get('countries/?limit=1000')
        .then((data) => {
            const countries = data.data?.results;
            countries.map((country) => {
                const { id, name } = country;
                dispatch(addCountry({
                    id: id,
                    name: name,
                }))
            });
        })
        .catch((error) => {
            console.error(error);
        })
}

export const getRegionData = (dispatch) => {
    instance.get('regions/?limit=1000')
        .then((data) => {
            const regions = data.data?.results;
            regions.map((region) => {
                const { id, name } = region;
                dispatch(addRegion({
                    id: id,
                    name: name
                }))
            });
        })
        .catch((error) => {
            console.error(error);
        })
}

export const getProvinceData = (dispatch) => {
    instance.get('provinces/?limit=1000')
        .then((data) => {
            const provinces = data.data?.results;
            provinces.map((province) => {
                const { id, name } = province;
                dispatch(addProvince({
                    id: id,
                    name: name
                }))
            });
        })
        .catch((error) => {
            console.error(error);
        })
}

export const getCommuneData = (dispatch) => {
    instance.get('communes/?limit=1000')
        .then((data) => {
            const communes = data.data?.results;
            communes.map((commune) => {
                const { id, name, province } = commune;
                dispatch(addCommune({
                    id: id,
                    name: name,
                    province: province
                }))
            });
        })
        .catch((error) => {
            console.error(error);
        })
}

export const getSpecialties = (dispatch) => {
    instance.get('provider-specialities/')
    .then((response) => {
        const specialties = response.data?.results;
        //console.log(specialties)
        dispatch(fillSpecialities(specialties))
    })
    .catch((error) => {
        console.error(error)
    })
}

// POST DATA TO THE API
export const postData = (data) => {
    instance.post('providers/', {
        name: data?.name,
        social_reason: data?.social_reason,
        rut: data?.rut,
        address: data?.address,
        extra_address: data?.extra_address,
        phone: data?.phone,
        seller_full_name: data?.seller_full_name,
        seller_email: data?.seller_email,
        //region: data?.name,
        region: data?.region,
        province: data?.province,
        commune: data?.commune,
        speciality: data?.speciality,
        product_type: data?.product_type,
        payment_method: data?.payment_method,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        })
}

// DATA MOD TO THE API
export const updateData = (id, data) => {
    instance.put(`providers/${id}/`, {
        name: data?.name,
        social_reason: data?.social_reason,
        rut: data?.rut,
        address: data?.address,
        extra_address: data?.extra_address,
        phone: data?.phone,
        seller_full_name: data?.seller_full_name,
        seller_email: data?.seller_email,
        region: data?.region,
        province: data?.province,
        commune: data?.commune,
        speciality: data?.speciality,
        product_type: data?.product_type,
        payment_method: data?.payment_method,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        })
}

// DELETE DATA FROM API
export const deleteData = (id) => {
    instance.delete(`providers/${id}/`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        })
}

export const downladReport = (filters) => {
    instance.get(`provider-reports/?region=${filters.regionFilter}&province=${filters.provinceFilter}&commune=${filters.communeFilter}&speciality=${filters.specialityFilter}&product_type=${filters.typeFilter}&payment_method=${filters.methodFilter}`, { responseType: 'blob' })
        .then(function (response) {
            //console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte_proveedores.xlsx');
            document.body.appendChild(link);
            link.click();
        })
        .catch(function (error) {
            console.error(error);
        })
}

export const downloadTemplate = () => {
    instance.get(`providers-upload-template/`, { responseType: 'blob' })
        .then((response) => {
            //console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'modelo-carga-proveedores.xlsx');
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            console.log(error);
        })
}

export const uploadFile = (FormData) => {
    instance.post(`upload-providers/`, FormData)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}

