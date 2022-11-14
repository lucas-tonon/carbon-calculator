import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ReportTable = ({ rows }) =>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='center' sx={{ width: '33%', fontWeight: 600 }}>Category</TableCell>
          <TableCell align='center' sx={{ width: '33%', fontWeight: 600 }}>Your Emissions (kg of CO2 / year) </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {
          rows && rows.map((row) =>
            <TableRow key={row.category}>
              <TableCell align='center' sx={{ fontWeight: 600 }}>{row.category}</TableCell>
              <TableCell align='center'>{row.yourEmission.toFixed(2)}</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  </TableContainer>

export default ReportTable;
