import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const SuperTableBody = (props: any) => {
  return (
    <TableBody>
      {props.data.map((row: any) => (
        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.numOfCards}</TableCell>
          <TableCell align="left">{row.lastUpdated}</TableCell>
          <TableCell align="left">{row.createdBy}</TableCell>
          <TableCell align="left">
            {row.actions.map((el: any, index: number) => (
              <span key={index}>{el}</span>
            ))}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
