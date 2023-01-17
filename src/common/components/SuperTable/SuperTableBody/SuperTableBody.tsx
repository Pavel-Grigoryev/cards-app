import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const SuperTableBody = (props: any) => {
  console.log(props)

  return (
    <TableBody>
      {props.data.map((row: any) => (
        <TableRow
          key={row._id}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={{ maxWidth: '220px', wordBreak: 'break-all' }}>
            {row.name || row.question}
          </TableCell>
          <TableCell align="left">
            {(row.cardsCount === 0 ? '0' : row.cardsCount) || row.answer}
          </TableCell>
          <TableCell align="left">{row.updated}</TableCell>
          <TableCell align="left">{row.user_name || row.grade}</TableCell>
          {props.data[0].type === 'card' ? null : (
            <TableCell align="left">
              <IconButton>
                <SchoolIcon fontSize={'small'} />
              </IconButton>
              <IconButton>
                <EditIcon fontSize={'small'} />
              </IconButton>
              <IconButton>
                <DeleteIcon fontSize={'small'} />
              </IconButton>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
