// REACT IMPORTS
import React, { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { element } from 'prop-types';

const DataGridComponent = ({ 
        rows, 
        columns,
        loading,
        setOffsetPage,
        setLimitPage,
        limitPage,
        offsetPage,
        increment
         }) => {

    // ROWS TOP/BOTTOM SPACING CONFIGURATION
    const getRowSpacing = React.useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 4,
            bottom: params.isLastVisible ? 0 : 4,
        };
    }, []);
    //! Este codigo no se usa
    // let count = 0
    // for (let row of rows) {
    //     if (row.id == 80)
    //         //   rows[count].status = 'En proceso'; 
    //         // console.log(row);
    //         count++
    // }


    //!Codigo sin uso
    // const dataGridRef = React.useRef();

    //! Se elimina este codigo
    // const handleNextPage = () => {
    //     const nextPage = dataGridRef.current.apiRef.current.state.pagination.page + 1;
    //     console.log('Next Page:');
    // };

    //* Se agrega el siguiente codigo 
    // let valuePage = 100;
    const [value, setValue] = useState(1);

    // const handleNextPage = async() => {
    //    let btnNext = await document.querySelector('[title="Ir a la página siguiente"]');
    
    //     btnNext.addEventListener('click', () => {
    //         setValue( value + 1 )
    //     });
    // }
    // console.log(value)
    // const handlePrevtPage = async() => {
    //      let btnPrev = await document.querySelector('[title="Ir a la página anterior"]');
    
    //     //  btnPrev.addEventListener('click', () => {
    //         // setCurrentPage( currentPage  - valuePage );
    //         // setLimitPage( limitPage  + valuePage );
    //     // });
    // }
    
    // handlePrevtPage();
    // handleNextPage();
    return (
        <DataGrid
            pageSize = {100}
            rows={rows}
            columns={columns}
            loading={loading}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            // localeText={null}
            getRowSpacing={getRowSpacing}
            style={{ '& .MuiDataGridRow:selected': { bgcolor: '#ffffff', fontFamily: 'Roboto', fontSize: 14, fontWeight: 'bold', borderRadius: '12px' }, }}
            sx={{
                '& .MuiDataGrid-cell:select': { color: 'secondary' },
                '& .MuiDataGrid-cell': {borderBottom: '1px solid #DCDCDC'} ,
                '& .MuiDataGrid-row': { bgcolor: 'gray.light', fontFamily: 'Roboto', fontSize: 14, fontWeight: 'bold', borderRadius: '12px', '&$selected': { backgroundColor: 'yellow' } },
                '& .MuiDataGrid-row:hover': { bgcolor: '#b0edff', fontFamily: 'Roboto', fontSize: 14, fontWeight: 'bold', borderRadius: '12px' },

                '& .MuiDataGrid-columnHeaders ': {
                    //borderBottom: '1px solid #DCDCDC',
                    //borderColor: 'gray',
                    fontSize: 17,
                    fontFamily: 'Roboto',
                    color: '#5F6A6A',
                },
            }}
        />
    );
}

export default DataGridComponent;