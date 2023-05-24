import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AcquisitionsLayout from 'pages/acquisitions/acquisitions_views/layout/acquisition-layout';

// render - sample page
const MarerialsMain = Loadable(lazy(() => import('pages/materials/Materials_main')));
const Projects = Loadable(lazy(() => import('pages/projects/Projects_main')));
const FamiliesMain = Loadable(lazy(() => import('pages/families/Families_main')));
const SubFamiliesMain = Loadable(lazy(() => import('pages/sub_families/SubFamilies_main')));
const ProvidersMain = Loadable(lazy(() => import('pages/providers/Providers_main')));
const UsersMain = Loadable(lazy(() => import('pages/users/Users_main')));
const ProjectSingle = Loadable(lazy(() => import('pages/projects/project-single/ProjectSingle_main')));
const ProjectSingleCubage = Loadable(lazy(() => import('pages/projects/project-single/ProjectSingle_main_cubage')));
const CubageMain = Loadable(lazy(() => import('pages/cubage/Cubage_main')));
const CubageForm = Loadable(lazy(() => import('pages/cubage/cubage_views/cubage_form')));
const Totalization = Loadable(lazy(()=> import('pages/totalization/Totalization_main.js')));
const CubageProjectsList = Loadable(lazy(() => import('pages/cubage/cubage_views/cubage_projects_list')));
const CubageMainForm = Loadable(lazy(() => import('pages/new_cubage/cubage_views/cubage_form/Cubage_main_form')));
const MaterialExtendedForm = Loadable(lazy(() => import('pages/materials/materials_views/materials_extended_form')));
const Acquisitions = Loadable(lazy(() => import('pages/acquisitions/Acquisitions_main')));
const AcquisitionsForm = Loadable(lazy(() => import('pages/acquisitions/acquisitions_views/Acquisitions_form')));
const PageLoader = Loadable(lazy(() => import('pages/loader/loader')));


// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'materials',
            element: <MarerialsMain />
        },
        {
            path: 'projects',
            element: <Projects />
        },
        {
            path: 'families',
            element: <FamiliesMain />
        },
        {
            path: 'subfamilies',
            element: <SubFamiliesMain />
        },
        {
            path: 'providers',
            element: <ProvidersMain />
        },
        {
            path: 'users',
            element: <UsersMain />
        },
        {            
            path: 'Project-single/:id',
            element: <ProjectSingle />
        },
        {            
            path: 'Project-single/:id/cubage',
            element: <ProjectSingleCubage />
        },
        {
            path: 'Project-single',
            element: <ProjectSingle />
        },
        {
            path: 'cubageList/',
            element: <CubageProjectsList />
        },
        {
            path: 'cubage/:pid',
            element: <CubageMain />
        },
        //{
        //    path: 'cubageForm/',
        //    element: <CubageForm />
        //},
        {
            path: 'cubageForm/:pid/:cid',
            element: <CubageForm />
        },
        {
            path: 'newCubageForm',
            element: <CubageMainForm />
        },
        {
            path: 'totalization',
            element: <Totalization />
        },
        {
            path: 'totalization/:id',
            element: <Totalization />
        },
        {
            path: 'materialextendedform/:id',
            element: <MaterialExtendedForm />
        },
        {
            path: 'acquisitions',
            element: <Acquisitions />
        },
        {
            path: 'acquisitionsform/:id',
            element: <AcquisitionsLayout />
        },
        {
            path: 'loading-config',
            element: <PageLoader />
        }
 
    ]
};

export default MainRoutes;
