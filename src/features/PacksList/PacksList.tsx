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
  searchData,
} from '../../common/selectors/packs-selector'

import {
  createNewPackTC,
  getPacksTC,
  updatePacksPagination,
  deletePackTC,
  updatePackTC,
  updateSearch,
} from './packsList-reducer'
import s from './PacksList.module.scss'
const packsListTableNames = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector<PackType[]>(packsData)
  const page = useAppSelector<number>(pageData)
  const pageCount = useAppSelector<number>(pageCountData)
  const cardPacksTotalCount = useAppSelector<number>(cardPacksTotalCountData)
  const search = useAppSelector<string | undefined>(searchData)

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

  const deletePackHandler = (packId: string) => {
    dispatch(deletePackTC(packId))
  }

  const studyPackHandler = (packId: string) => {
    navigate(PATH.PACK_PAGE, { state: { packId } })
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

  const changeSearchHandler = (newValue: string | undefined) => {
    dispatch(updateSearch({ newValue }))
  }

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, pageCount])

  return (
    <>
      <div className={s.head}>
        <h1>Packs list</h1>
        <SuperButton title={'Add new pack'} onClick={createNewPackHandler} />
      </div>
      <div>
        <Filters value={search} onChange={changeSearchHandler} />
        {/*  Компонента для таблицы */}
        <SuperTable
          headerNames={packsListTableNames}
          bodyData={packs}
          deleteHandler={deletePackHandler}
          updateHandler={updatePackHandler}
          studyHandler={studyPackHandler}
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
