// assets
import { DashboardOutlined, ShopOutlined, GitlabFilled, GoldOutlined, AppstoreAddOutlined, UserOutlined, EyeOutlined, OrderedListOutlined, FileProtectOutlined, FundProjectionScreenOutlined, ShoppingOutlined  } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    ShopOutlined,
    GitlabFilled, 
    GoldOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    EyeOutlined,
    OrderedListOutlined,
    FileProtectOutlined,
    FundProjectionScreenOutlined,
    ShoppingOutlined
};

// ==============================|| MENU ITEMS - Principal ||============================== //

const dashboard = {
    id: 'group-main',
    title: 'Principal',
    type: 'group',
    children: [
        {
            id: 'materials-main',
            title: 'Materiales',
            type: 'collapse',
            url: '/materials',
            key: 1,
            icon: icons.GoldOutlined,
        },
        {
            id: 'families',
            title: 'Familias',
            type: 'collapse',
            url: '/families',
            key: 2,
            icon: icons.AppstoreAddOutlined
        },
        {
            id: 'subFamilies',
            title: 'SubFamilias',
            type: 'collapse',
            url: '/subfamilies',
            key: 3,
            icon: icons.AppstoreAddOutlined
        },
        {
            id: 'providers',
            title: 'Proveedores',
            type: 'item',
            url: '/providers',
            key: 4,
            icon: icons.ShoppingOutlined
        },
        {
            id: 'projects',
            title: 'Listado Proyectos',
            type: 'item',
            url: '/projects',
            icon: icons.FundProjectionScreenOutlined
        },
        {
            id: 'users',
            title: 'Usuarios',
            type: 'item',
            url: '/users',
            icon: icons.UserOutlined
        },
        {
            id: 'cubage',
            title: 'Cubicación',
            type: 'item',
            url: '/cubageList',
            icon: icons.FileProtectOutlined
        },
        {
            id: 'acquisition',
            title: 'Adquisición',
            type: 'item',
            url: '/acquisitions',
            icon: icons.ShopOutlined

        }

    ]
};

export default dashboard;
