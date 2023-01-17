import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const SuperTableBody = (props: any) => {
  console.log(props)

  return (
    <TableBody>
      {props.data.map((row: any) => (
        <TableRow
          key={row.name}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={{ maxWidth: '220px', wordBreak: 'break-all' }}>
            {row.name || row.question}
          </TableCell>
          <TableCell align="left">{row.cardsCount || row.answer}</TableCell>
          <TableCell align="left">{row.updated}</TableCell>
          <TableCell align="left">{row.user_name || row.grade}</TableCell>
          {props.data[0].type === 'card' ? null : <TableCell align="left">hi</TableCell>}
        </TableRow>
      ))}
    </TableBody>
  )
}
