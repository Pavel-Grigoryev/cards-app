import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { useAppSelector } from '../../../../app/store'
import { sortPacks } from '../../../selectors/packs-selector'

export const pureChange = (sort: string, down: string, up: string) => {
  return sort === up ? down : up
}

export const SuperTableHead = (props: any) => {
  const sort = useAppSelector<string>(sortPacks)

  return (
    <TableHead
      sx={{
        backgroundColor: '#EFEFEF',
      }}
    >
      <TableRow>
        {props.data.map((el: any) => {
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
                active={sort.slice(1) === el.sortName}
                direction={sort.includes('0') ? 'desc' : 'asc'}
                onClick={() => {
                  props.sortingHandler(pureChange(sort, down, up))
                }}
              >
                {el.name}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}
