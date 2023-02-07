import React, { FC, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { PackType } from '../../../../app/api/cardsAPI/cardsAPITypes'
import { useAppSelector } from '../../../../app/store'
import noImg from '../../../../assets/images/download.png'
import { DeleteModal } from '../../../../features/Modals/DeleteModal/DeleteModal'
import { EditPackModal } from '../../../../features/Modals/EditPackModal/EditPackModal'
import { isLoading } from '../../../selectors/app-selector'
import { userIdData } from '../../../selectors/profile-selector'

type CardsRowPropsType = {
  row: PackType
  deleteHandler: (cardId: string) => void
  studyHandler: (cardId: string) => void
  openPackHandler: (cardId: string) => void
  updatePackHandler: (
    cardId: string,
    packName: string,
    isPrivatePack: boolean,
    cover: string
  ) => void
}

export const PacksRow: FC<CardsRowPropsType> = ({
  row,
  deleteHandler,
  studyHandler,
  openPackHandler,
  updatePackHandler,
}) => {
  const [isCoverImgBroken, setCoverImgBroken] = useState(false)
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
      <TableCell>
        <img
          alt="cover"
          style={{ width: '60px' }}
          id={row._id}
          src={isCoverImgBroken || !row.deckCover ? noImg : row.deckCover}
          onError={() => errorHandler(setCoverImgBroken)}
        ></img>
      </TableCell>
      <TableCell
        onClick={() => {
          openPackHandler(row._id)
        }}
        component="th"
        scope="row"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            fontWeight: 'bold',
          },
        }}
      >
        {
          <span
            style={{
              display: 'block',
              width: '260px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row.name}
          </span>
        }
      </TableCell>
      <TableCell align="left">{row.cardsCount === 0 ? '0' : row.cardsCount}</TableCell>
      <TableCell align="left">{row.updated.slice(0, row.updated.indexOf('T'))}</TableCell>
      <TableCell align="left">{row.user_name}</TableCell>

      {
        <TableCell align="left" style={{ height: '100%' }}>
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            {
              <IconButton
                onClick={e => {
                  studyHandler(row._id)
                }}
                disabled={!row.cardsCount || status === 'loading'}
              >
                <SchoolIcon fontSize={'small'} />
              </IconButton>
            }
            {row.user_id === userId && (
              <>
                <EditPackModal
                  title={<EditIcon fontSize={'small'} />}
                  disabledButton={status === 'loading'}
                  currentPackName={row.name}
                  isPrivate={row.private}
                  coverImg={row.deckCover}
                  updatePack={(packName: string, isPrivatePack: boolean, cover: string) => {
                    updatePackHandler(row._id, packName, isPrivatePack, cover)
                  }}
                />
                <DeleteModal
                  title={<DeleteIcon fontSize={'small'} />}
                  name={row.name}
                  type={'pack'}
                  disabledButton={status === 'loading'}
                  deleteItem={() => deleteHandler(row._id)}
                />
              </>
            )}
          </span>
        </TableCell>
      }
    </TableRow>
  )
}
