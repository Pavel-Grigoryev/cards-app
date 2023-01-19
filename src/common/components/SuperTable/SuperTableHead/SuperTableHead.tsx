import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { useAppSelector } from '../../../../app/store'
import { cardsData, packUserId, sortCards } from '../../../selectors/cards-selector'
import { packsData, sortPacks } from '../../../selectors/packs-selector'
import { userIdData } from '../../../selectors/profile-selector'

const pureChange = (sort: string, down: string, up: string) => {
  return sort === up ? down : up
}

type SuperTableHeadPropsType = {}

export const SuperTableHead = (props: any) => {
  const sortPack = useAppSelector<string>(sortPacks)
  const sortCard = useAppSelector<string>(sortCards)
  const userId = useAppSelector(userIdData)
  const packUser = useAppSelector(packUserId)

  let headerTitles = props.data

  if (props.data[0].name === 'Question') {
    if (packUser === userId) {
      headerTitles = props.data
    } else {
      headerTitles = props.data.filter((el: any) => (el.name === 'Actions' ? '' : el))
    }
  }

  const sort = props.data[0].name === 'Question' ? sortCard : sortPack

  return (
    <TableHead
      sx={{
        backgroundColor: '#EFEFEF',
      }}
    >
      <TableRow>
        {headerTitles.map((el: any) => {
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
