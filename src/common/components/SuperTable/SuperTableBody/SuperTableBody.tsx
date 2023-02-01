import React, { useEffect, useState } from 'react'

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
import noImg from '../../../../assets/images/download.png'
import { DeleteModal } from '../../../../features/Modals/DeleteModal/DeleteModal'
import { EditCardModal } from '../../../../features/Modals/EditCardModal/EditCardModal'
import { EditPackModal } from '../../../../features/Modals/EditPackModal/EditPackModal'
import { isLoading } from '../../../selectors/app-selector'
import { userIdData } from '../../../selectors/profile-selector'

type SuperTableBodyPropsType = {
  data: PackType[] | CardType[]
  studyHandler?: (cardId: string) => void
  updatePackHandler?: (cardId: string, packName: string, isPrivatePack: boolean) => void
  deleteHandler: (cardId: string) => void
  openPackHandler?: (cardId: string) => void
  updateCardHandler?: (cardId: string, question: string, answer: string) => void
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
          {props.data[0].type === 'pack' ? (
            <TableCell>
              <img style={{ width: '60px' }} src={row.deckCover ? row.deckCover : noImg}></img>
            </TableCell>
          ) : null}
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
                width: '260px',
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
            {row.user_name || <Rating name="simple-controlled" value={row.grade} readOnly />}
          </TableCell>

          {props.data[0].type === 'card' && row.user_id !== userId ? null : (
            <TableCell align="left" style={{ height: '100%' }}>
              <span style={{ display: 'flex', flexDirection: 'row' }}>
                {row.user_id === userId && props.data[0].type === 'card' ? null : (
                  <IconButton
                    onClick={e => {
                      props.studyHandler?.(row._id)
                    }}
                    disabled={!row.cardsCount || status === 'loading'}
                  >
                    <SchoolIcon fontSize={'small'} />
                  </IconButton>
                )}
                {row.user_id === userId && props.data[0].type === 'card' && (
                  <EditCardModal
                    title={<EditIcon fontSize={'small'} />}
                    rowQuestion={row.question}
                    disabledButton={status === 'loading'}
                    rowAnswer={row.answer}
                    updateCard={(question, answer) => {
                      if (props.updateCardHandler) {
                        props.updateCardHandler(row._id, question, answer)
                      }
                    }}
                  />
                )}
                {row.user_id === userId && props.data[0].type === 'pack' && (
                  <EditPackModal
                    title={<EditIcon fontSize={'small'} />}
                    disabledButton={status === 'loading'}
                    currentPackName={row.name}
                    isPrivate={row.private}
                    updatePack={(packName: string, isPrivatePack: boolean) => {
                      if (props.updatePackHandler) {
                        props.updatePackHandler(row._id, packName, isPrivatePack)
                      }
                    }}
                  />
                )}
                {row.user_id === userId && (
                  <DeleteModal
                    title={<DeleteIcon fontSize={'small'} />}
                    name={row.name || row.question}
                    type={props.data[0].type}
                    disabledButton={status === 'loading'}
                    deleteItem={() => props.deleteHandler(row._id)}
                  />
                )}
              </span>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
