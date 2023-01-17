import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

export const SuperTableHead = (props: { data: string[] }) => {
  return (
    <TableHead
      sx={{
        backgroundColor: '#EFEFEF',
      }}
    >
      <TableRow>
        {props.data.map((el, index) => (
          <TableCell
            sx={{
              fontWeight: 'bold',
              fontSize: 14,
            }}
            align="left"
            key={index}
          >
            <TableSortLabel
            // active={orderBy === headCell.id}
            // direction={orderBy === headCell.id ? order : 'asc'}
            // onClick={createSortHandler(headCell.id)}
            >
              {el}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
