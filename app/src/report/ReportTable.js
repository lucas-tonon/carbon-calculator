import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const buildTableRows = (parameters) => {
  const emissions = parameters.emissions;
  const rows = Object.entries(emissions).map(entry => ({ category: entry[0], yourEmission: entry[1] }));

  rows.push({category: 'total', yourEmission: (emissions.electricity + emissions.transportation + emissions.heating) });

  return rows;
};

const ReportTable = ({ parameters }) => {

  const rows = buildTableRows(parameters);

  return (
    <TableContainer component={Paper} data-testid='report-table'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                sx={{ width: '33%', fontWeight: 600 }}
                data-testid='head-column'
              >
                Category
              </TableCell>

              <TableCell
                align='center'
                sx={{ width: '33%', fontWeight: 600 }}
                data-testid='head-column'
              >
                Your Emissions (kg of CO2 / year)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              rows && rows.map((row) =>
                <TableRow key={row.category}>
                  <TableCell
                    align='center'
                    sx={{ fontWeight: 600 }}
                    data-testid='category-value'
                  >
                    {row.category}
                  </TableCell>

                  <TableCell align='center' data-testid='your-emission-value'>
                    {row.yourEmission.toFixed(2)}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
  );
}


export default ReportTable;
