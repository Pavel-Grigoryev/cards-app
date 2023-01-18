import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../../app/store'
import { userIdData } from '../../../selectors/profile-selector'

export const SuperTableBody = (props: any) => {
  const userId = useAppSelector(userIdData)

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
              <IconButton onClick={() => props.studyHandler(row._id, row.user_id)}>
                <SchoolIcon fontSize={'small'} />
              </IconButton>
              {row.user_id === userId && (
                <span>
                  <IconButton onClick={() => props.updateHandler(row._id)}>
                    <EditIcon fontSize={'small'} />
                  </IconButton>
                  <IconButton onClick={() => props.deleteHandler(row._id)}>
                    <DeleteIcon fontSize={'small'} />
                  </IconButton>
                </span>
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
