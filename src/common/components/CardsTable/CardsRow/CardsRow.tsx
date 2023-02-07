import React, { FC, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Rating from '@mui/material/Rating'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { CardType } from '../../../../app/api/cardsAPI/cardsAPITypes'
import { useAppSelector } from '../../../../app/store'
import { ModeType } from '../../../../features/Modals/AddNewCardModal/AddNewCardModal'
import { DeleteModal } from '../../../../features/Modals/DeleteModal/DeleteModal'
import { EditCardModal } from '../../../../features/Modals/EditCardModal/EditCardModal'
import { NEW_CARD } from '../../../constants/newCardEmptyProp'
import { isLoading } from '../../../selectors/app-selector'
import { userIdData } from '../../../selectors/profile-selector'

import noImg from 'assets/images/download.png'

type CardsRowPropsType = {
  row: CardType
  deleteHandler: (cardId: string) => void
  updateCardHandler: (
    cardId: string,
    newQuestion: string,
    newAnswer: string,
    mode: ModeType
  ) => void
}

export const CardsRow: FC<CardsRowPropsType> = ({ row, deleteHandler, updateCardHandler }) => {
  const [isQuestionImgBroken, setQuestionImgBroken] = useState(false)
  const [isAnswerImgBroken, setIsAnswerImgBroken] = useState(false)

  const userId = useAppSelector(userIdData)
  const status = useAppSelector(isLoading)

  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true)
  }

  return (
    <TableRow
      key={row._id}
      hover={true}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {row.questionImg && row.questionImg !== NEW_CARD.EMPTY_IMG ? (
          <img
            alt="cover"
            id={row._id}
            style={{ width: '60px' }}
            src={isQuestionImgBroken ? noImg : row.questionImg}
            onError={() => errorHandler(setQuestionImgBroken)}
          />
        ) : (
          <span
            style={{
              display: 'block',
              width: '160px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row.question}
          </span>
        )}
      </TableCell>
      <TableCell align="left">
        {row.answerImg && row.answerImg !== NEW_CARD.EMPTY_IMG ? (
          <img
            alt="cover"
            id={row._id}
            style={{ width: '60px' }}
            src={isAnswerImgBroken ? noImg : row.answerImg}
            onError={() => errorHandler(setIsAnswerImgBroken)}
          />
        ) : (
          <span
            style={{
              display: 'block',
              width: '160px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row.answer}
          </span>
        )}
      </TableCell>
      <TableCell align="left">{row.updated.slice(0, row.updated.indexOf('T'))}</TableCell>
      <TableCell align="left">
        {<Rating name="simple-controlled" value={row.grade} readOnly />}
      </TableCell>

      {row.user_id === userId && (
        <TableCell align="left" style={{ height: '100%' }}>
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            {
              <EditCardModal
                title={<EditIcon fontSize={'small'} />}
                rowQuestion={row.question}
                rowAnswerImg={row.answerImg ? row.answerImg : NEW_CARD.EMPTY_IMG}
                rowQuestionImg={row.questionImg ? row.questionImg : NEW_CARD.EMPTY_IMG}
                disabledButton={status === 'loading'}
                rowAnswer={row.answer}
                updateCard={(newQuestion, newAnswer, mode) => {
                  updateCardHandler(row._id, newQuestion, newAnswer, mode)
                }}
              />
            }
            {
              <DeleteModal
                title={<DeleteIcon fontSize={'small'} />}
                name={row.question}
                type={'card'}
                disabledButton={status === 'loading'}
                deleteItem={() => deleteHandler(row._id)}
              />
            }
          </span>
        </TableCell>
      )}
    </TableRow>
  )
}
