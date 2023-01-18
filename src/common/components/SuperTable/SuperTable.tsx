import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { SuperTableBody } from './SuperTableBody/SuperTableBody'
import { SuperTableHead } from './SuperTableHead/SuperTableHead'

export const SuperTable = (props: any) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <SuperTableHead data={props.headerNames} />
        <SuperTableBody
          data={props.bodyData}
          studyHandler={props.studyHandler}
          deleteHandler={props.deleteHandler}
          updateHandler={props.updateHandler}
        />
      </Table>
    </TableContainer>
  )
}
