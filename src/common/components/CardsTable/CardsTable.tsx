import React, { FC } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { useAppSelector } from '../../../app/store'
import { ModeType } from '../../../features/Modals/AddNewCardModal/AddNewCardModal'
import { isLoading } from '../../selectors/app-selector'
import { cardsData, packUserId, sortCards } from '../../selectors/cards-selector'
import { userIdData } from '../../selectors/profile-selector'
import { pureChange } from '../../utils/sortTable'
import { packPageTableNames } from '../../utils/tableHeaderData'

import { CardsRow } from './CardsRow/CardsRow'

type CardsTablePropsType = {
  deleteHandler: (cardId: string) => void
  sortingHandler: (sortCards: string) => void
  updateCardHandler: (
    cardId: string,
    newQuestion: string,
    newAnswer: string,
    mode: ModeType
  ) => void
}

export const CardsTable: FC<CardsTablePropsType> = ({
  deleteHandler,
  sortingHandler,
  updateCardHandler,
}) => {
  const cards = useAppSelector(cardsData)
  const sortCard = useAppSelector(sortCards)
  const userId = useAppSelector(userIdData)
  const status = useAppSelector(isLoading)
  const packUser = useAppSelector(packUserId)

  let headerTitles

  if (packUser === userId) {
    headerTitles = packPageTableNames
  } else {
    headerTitles = packPageTableNames.filter(el => (el.name === 'Actions' ? '' : el))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: '#EFEFEF',
          }}
        >
          <TableRow>
            {headerTitles.map(el => {
              const up = '0' + el.sortName
              const down = '1' + el.sortName

              return (
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}
                  align="left"
                  key={el.name}
                >
                  <TableSortLabel
                    active={sortCard.slice(1) === el.sortName}
                    direction={sortCard.includes('0') ? 'desc' : 'asc'}
                    disabled={status === 'loading'}
                    onClick={() => {
                      sortingHandler(pureChange(sortCard, down, up))
                    }}
                  >
                    {el.name}
                  </TableSortLabel>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map(row => (
            <CardsRow
              key={row._id}
              row={row}
              deleteHandler={deleteHandler}
              updateCardHandler={updateCardHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
