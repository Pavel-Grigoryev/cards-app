import React, { useEffect } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { PackType } from '../../app/api'
import { RequestStatusType } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { Filters } from '../../common/components/Filters/Filters'
import { NotFound } from '../../common/components/NotFound/NotFound'
import { Preloader } from '../../common/components/Preloader/Preloader'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { isLoading } from '../../common/selectors/app-selector'
import {
  cardPacksTotalCountData,
  packsData,
  pageCountData,
  pageData,
  searchData,
  showPackCardsData,
  sortPacks,
} from '../../common/selectors/packs-selector'
import { packsListTableNames } from '../../common/utils/tableHeaderData'

import {
  createNewPackTC,
  deletePackTC,
  getPacksTC,
  setSort,
  ShowPackCardsType,
  updatePacksPagination,
  updatePackTC,
  updateSearch,
} from './packsList-reducer'
import s from './PacksList.module.scss'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector<PackType[]>(packsData)
  const page = useAppSelector<number>(pageData)
  const pageCount = useAppSelector<number>(pageCountData)
  const sort = useAppSelector<string>(sortPacks)
  const cardPacksTotalCount = useAppSelector<number>(cardPacksTotalCountData)
  const search = useAppSelector<string | undefined>(searchData)
  const status = useAppSelector<RequestStatusType>(isLoading)
  const showPackCards = useAppSelector<ShowPackCardsType>(showPackCardsData)

  const navigate = useNavigate()

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

  const studyPackHandler = (packId: string) => {
    navigate(`/packPage/${packId}`)
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
  }, [page, pageCount, search, sort, showPackCards])

  return (
    <>
      <div className={s.head}>
        <h1>Packs list</h1>
        <SuperButton title={'Add new pack'} onClick={createNewPackHandler} />
      </div>
      <div>
        <Filters value={search} onChange={changeSearchHandler} showPackCards={showPackCards} />
        {cardPacksTotalCount ? (
          <div className={s.wrapper}>
            {status === 'loading' && <Preloader contStyle={{ opacity: '0.5' }} />}
            <SuperTable
              headerNames={packsListTableNames}
              bodyData={packs}
              deleteHandler={deletePackHandler}
              updateHandler={updatePackHandler}
              studyHandler={studyPackHandler}
              sortingHandler={sortingHandler}
            />
            <SuperPagination
              page={page}
              itemsCountForPage={pageCount}
              totalCount={cardPacksTotalCount}
              onChange={changePaginationHandler}
            />
          </div>
        ) : (
          <NotFound message={'Packs not found. Change your search options.'} />
        )}
      </div>
    </>
  )
}
