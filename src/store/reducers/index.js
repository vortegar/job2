// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import materials from '../../pages/materials/materials_slices/materials_slice';
import materialsFilters from 'pages/materials/materials_slices/materials_filter';

import productsStates from '../../pages/materials/materials_slices/materials_states';
import subFamilies from 'pages/sub_families/subFamilies_slices.js/subFamilies_slice';
import subFamiliesStates from 'pages/sub_families/subFamilies_slices.js/subFamilies_states';
import subFamiliesFilters from 'pages/sub_families/subFamilies_slices.js/subFamilies_filters';


import families from 'pages/families/families_slices.js/families_slice';
import familiesStates from 'pages/families/families_slices.js/families_states';


import projects from "../../pages/projects/projects_slices/projects_slice";
import projectsStates from '../../pages/projects/projects_slices/projects_states';
import totalization_slice from 'pages/totalization/totalizacion_slice/totalization_slice';

import providers from '../../pages/providers/providers_slices/providers_slice';
import providersStates from 'pages/providers/providers_slices/providers_states';
import providersFilters from 'pages/providers/providers_slices/providers_filters';
import specialities from 'pages/providers/providers_slices/specialities_slices'

import countries from 'pages/providers/providers_slices/country_slice';
import regions from 'pages/providers/providers_slices/region_slice';
import provinces from 'pages/providers/providers_slices/province_slice';
import communes from 'pages/providers/providers_slices/commune_slice';
import users from 'pages/users/users_slices/users_slice';
import usersStates from 'pages/users/users_slices/users_states';

import cubageProjects from 'pages/cubage/cubage_slices/full_cubage_sections/cubageProjects_slice'
import cubageMainStates from 'pages/cubage/cubage_slices/cubage_states/cubage_main_states'
import cubageFormStates from 'pages/cubage/cubage_slices/cubage_states/cubage_form_states';
import supervisorUsers from 'pages/cubage/cubage_slices/cubage_users/cubage_users'
import cubicatorUsers from 'pages/cubage/cubage_slices/cubage_users/cubage_cubicator_user';
import currentCubage from 'pages/cubage/cubage_slices/current_cubage_slice';
import cubageFloor from 'pages/cubage/cubage_slices/full_cubage_sections/cubage_floor_slice';
import cubageGroups from 'pages/cubage/cubage_slices/full_cubage_sections/cubage_full_material_groups_slice'
import copyFloor from 'pages/cubage/cubage_slices/full_cubage_sections/copy_floor_slice';
import copyGroups from 'pages/cubage/cubage_slices/full_cubage_sections/copy_full_groups';

import acquisition from 'pages/acquisitions/acquisitions_slice/acquisitions_slice';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, totalization_slice, materials, productsStates, subFamiliesStates, subFamilies, families, familiesStates, providers, providersStates, countries, regions, provinces, communes, projects, projectsStates, users, usersStates, providersFilters, materialsFilters, subFamiliesFilters, cubageProjects, cubageMainStates, supervisorUsers, currentCubage, cubageFormStates, cubicatorUsers, cubageFloor, cubageGroups, copyFloor, copyGroups, acquisition, specialities });


export default reducers;
