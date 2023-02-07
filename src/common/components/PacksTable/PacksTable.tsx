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
import { isLoading } from '../../selectors/app-selector'
import { packsData, sortPacks } from '../../selectors/packs-selector'
import { pureChange } from '../../utils/sortTable'
import { packsListTableNames } from '../../utils/tableHeaderData'

import { PacksRow } from './PacksRow/PacksRow'

type PacksTablePropsType = {
  deleteHandler: (cardId: string) => void
  sortingHandler: (sortCards: string) => void
  openPackHandler: (cardId: string) => void
  studyHandler: (cardId: string) => void
  updatePackHandler: (
    cardId: string,
    packName: string,
    isPrivatePack: boolean,
    cover: string
  ) => void
}

export const PacksTable: FC<PacksTablePropsType> = ({
  sortingHandler,
  deleteHandler,
  updatePackHandler,
  openPackHandler,
  studyHandler,
}) => {
  const packs = useAppSelector(packsData)
  const sortPack = useAppSelector(sortPacks)
  const status = useAppSelector(isLoading)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: '#EFEFEF',
          }}
        >
          <TableRow>
            {packsListTableNames.map(el => {
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
                    active={sortPack.slice(1) === el.sortName}
                    direction={sortPack.includes('0') ? 'desc' : 'asc'}
                    disabled={status === 'loading'}
                    onClick={() => {
                      sortingHandler(pureChange(sortPack, down, up))
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
          {packs.map(row => (
            <PacksRow
              key={row._id}
              row={row}
              studyHandler={studyHandler}
              deleteHandler={deleteHandler}
              openPackHandler={openPackHandler}
              updatePackHandler={updatePackHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
