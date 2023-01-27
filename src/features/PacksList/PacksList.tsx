import React, { useEffect } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { Filters } from '../../common/components/Filters/Filters'
import { NotFound } from '../../common/components/NotFound/NotFound'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import {
  cardPacksTotalCountData,
  maxCardsCountData,
  maxData,
  minCardsCountData,
  minData,
  packsData,
  pageCountData,
  pageData,
  searchData,
  showPackCardsData,
  sortPacks,
} from '../../common/selectors/packs-selector'
import { packsListTableNames } from '../../common/utils/tableHeaderData'
import { AddNewPackModal } from '../Modals/AddNewPackModal/AddNewPackModal'

import {
  createNewPackTC,
  deletePackTC,
  getPacksTC,
  setSort,
  ShowPackCardsType,
  updatePacksPagination,
  updatePackTC,
  updateSearch,
  updateShowPackCards,
} from './packsList-reducer'
import s from './PacksList.module.scss'

export const PacksList = (props: any) => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(packsData)
  const page = useAppSelector(pageData)
  const pageCount = useAppSelector(pageCountData)
  const sort = useAppSelector(sortPacks)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountData)
  const search = useAppSelector(searchData)
  const showPackCards = useAppSelector(showPackCardsData)

  const minCardsCount = useAppSelector(minCardsCountData)
  const maxCardsCount = useAppSelector(maxCardsCountData)
  const min = useAppSelector(minData)
  const max = useAppSelector(maxData)

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const createNewPackHandler = (packName: string, isPrivatePack: boolean) => {
    const cardsPack = { cardsPack: { name: packName, deckCover: '', private: isPrivatePack } }

    dispatch(createNewPackTC(cardsPack))
  }

  const sortingHandler = (sortPacks: string) => {
    dispatch(setSort({ sortPacks }))
  }

  const deletePackHandler = (packId: string) => {
    dispatch(deletePackTC(packId))
  }

  const openPackHandler = (packId: string) => {
    navigate(`/packPage/${packId}`)
  }

  const updatePackHandler = (packId: string, packName: string, isPrivatePack: boolean) => {
    dispatch(updatePackTC({ cardsPack: { _id: packId, name: packName, private: isPrivatePack } }))
  }

  const changePaginationHandler = (page: number, pageCount: number) => {
    dispatch(updatePacksPagination({ page, pageCount }))
  }

  const changeSearchHandler = (newValue: string | undefined) => {
    dispatch(updateSearch({ newValue }))
  }

  const updShowPackCards = (butValue: ShowPackCardsType) => {
    dispatch(updateShowPackCards({ butValue }))
    setSearchParams({ accessory: butValue })
  }

  useEffect(() => {
    const params: SearchPramsType = Object.fromEntries(searchParams)
    const accessory = params.accessory || 'all'

    dispatch(updateShowPackCards({ butValue: accessory }))
    dispatch(getPacksTC({ showPackCards: accessory }))
  }, [page, pageCount, search, sort, min, max])

  return (
    <>
      <div className={s.head}>
        <h1>Packs list</h1>
        <AddNewPackModal title={'Add new pack'} createNewPackHandler={createNewPackHandler} />
      </div>
      <div>
        <Filters
          value={search}
          onChange={changeSearchHandler}
          showPackCards={showPackCards}
          min={min}
          max={max}
          minCardsCount={minCardsCount}
          maxCardsCount={maxCardsCount}
          updShowPackCards={updShowPackCards}
        />
        {cardPacksTotalCount ? (
          <div className={s.wrapper}>
            <SuperTable
              headerNames={packsListTableNames}
              bodyData={packs}
              deleteHandler={deletePackHandler}
              updatePackHandler={updatePackHandler}
              studyHandler={props.studyPackHandler}
              sortingHandler={sortingHandler}
              openPackHandler={openPackHandler}
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

type SearchPramsType = {
  accessory?: ShowPackCardsType
}
