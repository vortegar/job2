// REACT IMPORTS
import React from 'react';

// CUSTOM COMPONENTS IMPORTs
import MainCard from 'components/MainCard';

// VIEWS IMPORTS
import FormDialog from './projects_views/projects_form_cubage';

const SamplePage = () => {

    return (
        <>
        <MainCard  title="Proyectos"   >
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <FormDialog/>
                    </div>
                </div>
            </div>
        </MainCard>
        </>
    );
};

export default SamplePage;
