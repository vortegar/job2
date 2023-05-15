import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import AcquisitionsForm from '../components/aquisition-form';
import { getProvidersData } from 'pages/providers/providers_services/providers_service';
import { getTotalization } from 'pages/acquisitions/acquisitions_service/acquisitionService';

import { Button, Grid } from '../../../../../node_modules/@mui/material/index';
import BreadcrumComponent from '../components/breadcrum';
import './layout-aquisitions.css';
const AcquisitionsLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const deleteId = '';
  const data = useSelector((store) => store.providersFilters);
  console.log(data, '--data');
  console.log(getTotalization(id, dispatch), 'totalization');
  useEffect(() => {
    getProvidersData(dispatch, deleteId, data);
    getTotalization(id, dispatch);
  }, []);

  return (
    <React.Fragment>
      <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mb={'2%'}>
          <Grid item xs={12} sm={6} mb={2}>
            <BreadcrumComponent />
          </Grid>
          <Grid item xs={12} sm={6} mb={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button className="button-file">
              <FileOutlined />
            </Button>
            <Button className="button-back">Regresar</Button>
          </Grid>
        </Grid>
        <div className="container-family">
          <h2>Familia Luminaria</h2>
          <AcquisitionsForm key={'1'} material_name={'Base recta plástica'} />
          <AcquisitionsForm key={'2'} material_name={'Soldadura pto azul 1/8'} />
          <AcquisitionsForm key={'2'} material_name={'Soldadura pto azul 1/8'} />
        </div>
        <div className="container-family">
          <h2>Familia de mallas</h2>
          <AcquisitionsForm key={'1'} material_name={'Base recta plástica'} />
          <AcquisitionsForm key={'2'} material_name={'Soldadura pto azul 1/8'} />
        </div>
      </>
    </React.Fragment>
  );
};

export default AcquisitionsLayout;
