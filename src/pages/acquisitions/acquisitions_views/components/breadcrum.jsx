import { Breadcrumbs } from '../../../../../node_modules/@mui/material/index';
import { RightOutlined, HomeOutlined } from '@ant-design/icons';

const BreadcrumComponent = () => {
  const breadcrumbs = [
    <span key={1}>
      <HomeOutlined />{' '}
    </span>,
    <span key={2}>Adquisición</span>,
    <span key={3}>Agregar proveedores</span>
  ];

  return (
    <Breadcrumbs separator={<RightOutlined />} aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadcrumComponent;
