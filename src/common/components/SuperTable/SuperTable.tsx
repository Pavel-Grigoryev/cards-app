import React from 'react'

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { SuperTableBody } from './SuperTableBody/SuperTableBody'
import { SuperTableHead } from './SuperTableHead/SuperTableHead'

const tableHeader = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

const rows = [
  {
    name: 'Pack Name',
    numOfCards: 4,
    lastUpdated: '18.03.2021',
    createdBy: 'Ivan',
    actions: ['study', 'ModeEditOutlineOutlinedIcon', 'delete'],
  },
  {
    name: 'Pack Name',
    numOfCards: 4,
    lastUpdated: '18.03.2021',
    createdBy: 'Ivan',
    actions: ['study', 'edit', 'delete'],
  },
  {
    name: 'Pack Name',
    numOfCards: 4,
    lastUpdated: '18.03.2021',
    createdBy: 'Ivan',
    actions: ['study', 'edit', 'delete'],
  },
  {
    name: 'Pack Name',
    numOfCards: 4,
    lastUpdated: '18.03.2021',
    createdBy: 'Ivan',
    actions: ['study', 'edit', 'delete'],
  },
  {
    name: 'Pack Name',
    numOfCards: 4,
    lastUpdated: '18.03.2021',
    createdBy: 'Ivan',
    actions: ['study', 'edit', 'delete'],
  },
]

export const SuperTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <SuperTableHead data={tableHeader} />
        <SuperTableBody data={rows} />
      </Table>
    </TableContainer>
  )
}
