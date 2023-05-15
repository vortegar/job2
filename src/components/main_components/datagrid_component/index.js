// REACT IMPORTS
import * as React from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';

const DataGridComponent = ({ rows, columns, loading }) => {

    // ROWS TOP/BOTTOM SPACING CONFIGURATION
    const getRowSpacing = React.useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 4,
            bottom: params.isLastVisible ? 0 : 4,
        };
    }, []);

    let count = 0
    for (let row of rows) {
        if (row.id == 80)
            //   rows[count].status = 'En proceso'; 
            // console.log(row);
            count++
    }

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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