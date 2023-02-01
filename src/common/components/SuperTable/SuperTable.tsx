import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { CardType, PackType } from '../../../app/api/cardsAPI/cardsAPITypes'
import { ModeType } from '../../../features/Modals/AddNewCardModal/AddNewCardModal'
import { TableHeaderDataType } from '../../utils/tableHeaderData'

import { SuperTableBody } from './SuperTableBody/SuperTableBody'
import { SuperTableHead } from './SuperTableHead/SuperTableHead'

type SuperTablePropsType = {
  bodyData: PackType[] | CardType[]
  headerNames: Array<TableHeaderDataType>
  deleteHandler: (cardId: string) => void
  sortingHandler: (sortCards: string) => void
  studyHandler?: (cardId: string) => void
  updatePackHandler?: (cardId: string, packName: string, isPrivatePack: boolean) => void
  openPackHandler?: (cardId: string) => void
  updateCardHandler?: (
    cardId: string,
    newQuestion: string,
    newAnswer: string,
    mode: ModeType
  ) => void
}

export const SuperTable = (props: SuperTablePropsType) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <SuperTableHead headerNames={props.headerNames} sortingHandler={props.sortingHandler} />
        <SuperTableBody
          data={props.bodyData}
          studyHandler={props.studyHandler}
          deleteHandler={props.deleteHandler}
          updatePackHandler={props.updatePackHandler}
          openPackHandler={props.openPackHandler}
          updateCardHandler={props.updateCardHandler}
        />
      </Table>
    </TableContainer>
  )
}
