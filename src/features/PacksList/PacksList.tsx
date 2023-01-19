import React, { useEffect } from 'react'

import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { PackType } from '../../app/api'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { Filters } from '../../common/components/Filters/Filters'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { PATH } from '../../common/routes/routes'
import {
  cardPacksTotalCountData,
  packsData,
  pageCountData,
  pageData,
  sortPacks,
} from '../../common/selectors/packs-selector'

import {
  createNewPackTC,
  getPacksTC,
  updatePacksPagination,
  deletePackTC,
  updatePackTC,
  setSort,
} from './packsList-reducer'
import s from './PacksList.module.scss'
// const packsListTableNames = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

const packsListTableNames = [
  { name: 'Name', sortName: 'name' },
  { name: 'Cards', sortName: 'cardsCount' },
  { name: 'Last Updated', sortName: 'updated' },
  { name: 'Created by', sortName: 'user_name' },
  { name: 'Actions', sortDirection: '' },
]

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector<PackType[]>(packsData)
  const page = useAppSelector<number>(pageData)
  const pageCount = useAppSelector<number>(pageCountData)
  const sort = useAppSelector<string>(sortPacks)
  const cardPacksTotalCount = useAppSelector<number>(cardPacksTotalCountData)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const createNewPackHandler = () => {
    const cardsPack = {
      cardsPack: {
        name: 'No Name',
        deckCover: '',
        private: false,
      },
    }

    dispatch(createNewPackTC(cardsPack))
  }

  const sortingHandler = (sortPacks: string) => {
    dispatch(setSort({ sortPacks }))
  }

  const deletePackHandler = (packId: string) => {
    dispatch(deletePackTC(packId))
  }

  const studyPackHandler = (packId: string, userId: string) => {
    navigate(PATH.PACK_PAGE, { state: { packId, userId } })
  }

  const updatePackHandler = (packId: string) => {
    dispatch(
      updatePackTC({
        cardsPack: {
          _id: packId,
          name: 'New Name',
        },
      })
    )
  }

  const changePaginationHandler = (page: number, pageCount: number) => {
    dispatch(updatePacksPagination({ page, pageCount }))
  }

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, pageCount, sort])

  return (
    <>
      <div className={s.head}>
        <h1>Packs list</h1>
        <SuperButton title={'Add new pack'} onClick={createNewPackHandler} />
      </div>
      <div>
        <Filters />
        <SuperTable
          headerNames={packsListTableNames}
          bodyData={packs}
          deleteHandler={deletePackHandler}
          updateHandler={updatePackHandler}
          studyHandler={studyPackHandler}
          sortingHandler={sortingHandler}
        />
      </div>
      <SuperPagination
        page={page}
        itemsCountForPage={pageCount}
        totalCount={cardPacksTotalCount}
        onChange={changePaginationHandler}
      />
    </>
  )
}
