import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
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
  openPackHandler: (cardId: string) => void
}

export const SuperTableBody = (props: SuperTableBodyPropsType) => {
  const userId = useAppSelector(userIdData)
  const status = useAppSelector<RequestStatusType>(isLoading)

  return (
    <TableBody>
      {props.data.map((row: any) => (
        <TableRow
          key={row._id}
          hover={true}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
          }}
        >
          <TableCell
            onClick={() => {
              row.cardsCount || row.user_id === userId || !row.name
                ? props.openPackHandler?.(row._id)
                : alert('There are no cards in this pack!')
            }}
            component="th"
            scope="row"
            sx={
              row.name && {
                cursor: 'pointer',
                width: '230px',
                wordBreak: 'break-all',
                '&:hover': {
                  fontWeight: 'bold',
                },
              }
            }
          >
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
              {row.user_id === userId && props.data[0].type === 'card' ? null : (
                <IconButton
                  onClick={e => {
                    props.studyHandler?.(row._id)
                  }}
                  disabled={(!row.cardsCount && row.user_id !== userId) || status === 'loading'}
                >
                  <SchoolIcon fontSize={'small'} />
                </IconButton>
              )}
              {row.user_id === userId && (
                <span>
                  <IconButton
                    disabled={status === 'loading'}
                    onClick={() => props.updateHandler(row._id)}
                  >
                    <EditIcon fontSize={'small'} />
                  </IconButton>
                  <IconButton
                    disabled={status === 'loading'}
                    onClick={() => props.deleteHandler(row._id)}
                  >
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
