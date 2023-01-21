import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { Rating } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { CardType, PackType } from '../../../../app/api/cardsAPI/cardsAPITypes'
import { RequestStatusType } from '../../../../app/app-reducer'
import { useAppSelector } from '../../../../app/store'
import { isLoading } from '../../../selectors/app-selector'
import { userIdData } from '../../../selectors/profile-selector'

type SuperTableBodyPropsType = {
  data: PackType[] | CardType[]
  studyHandler?: (cardId: string) => void
  updateHandler: (cardId: string) => void
  deleteHandler: (cardId: string) => void
}

export const SuperTableBody = (props: SuperTableBodyPropsType) => {
  const userId = useAppSelector(userIdData)
  const status = useAppSelector<RequestStatusType>(isLoading)

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
          <TableCell align="left">{row.updated.slice(0, row.updated.indexOf('T'))}</TableCell>
          <TableCell align="left">
            {row.user_name || <Rating name="simple-controlled" value={0} readOnly />}
          </TableCell>

          {props.data[0].type === 'card' && row.user_id !== userId ? null : (
            <TableCell align="left">
              <IconButton
                onClick={() => props.studyHandler?.(row._id)}
                disabled={!row.cardsCount && row.user_id !== userId}
              >
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
