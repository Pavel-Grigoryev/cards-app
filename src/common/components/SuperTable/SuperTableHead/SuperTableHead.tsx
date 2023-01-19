import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { RequestStatusType } from '../../../../app/app-reducer'
import { useAppSelector } from '../../../../app/store'
import { isLoading } from '../../../selectors/app-selector'
import { packUserId, sortCards } from '../../../selectors/cards-selector'
import { sortPacks } from '../../../selectors/packs-selector'
import { userIdData } from '../../../selectors/profile-selector'
import { pureChange } from '../../../utils/sortTable'

type SuperTableHeadPropsType = {
  headerNames: Array<any>
  sortingHandler: (sortCards: string) => void
}

export const SuperTableHead = (props: SuperTableHeadPropsType) => {
  const sortPack = useAppSelector<string>(sortPacks)
  const sortCard = useAppSelector<string>(sortCards)
  const userId = useAppSelector<string>(userIdData)
  const packUser = useAppSelector<string>(packUserId)
  const status = useAppSelector<RequestStatusType>(isLoading)

  let headerTitles = props.headerNames

  if (props.headerNames[0].name === 'Question') {
    if (packUser === userId) {
      headerTitles = props.headerNames
    } else {
      headerTitles = props.headerNames.filter(el => (el.name === 'Actions' ? '' : el))
    }
  }

  const sort = props.headerNames[0].name === 'Question' ? sortCard : sortPack

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
                disabled={status === 'loading'}
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
