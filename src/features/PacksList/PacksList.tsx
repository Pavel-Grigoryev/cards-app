import React, { useEffect } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { AddNewPackModal } from '../Modals/AddNewPackModal/AddNewPackModal'

import { packThunks, ShowPackCardsType } from './packsList-reducer'
import s from './PacksList.module.scss'

import { useAppSelector } from 'app/store'
import { Filters } from 'common/components/Filters/Filters'
import { NotFound } from 'common/components/NotFound/NotFound'
import { PacksTable } from 'common/components/PacksTable/PacksTable'
import { SuperPagination } from 'common/components/SuperPagination/SuperPagination'
import { useActions } from 'common/hooks/useActions'
import {
  cardPacksTotalCountData,
  maxCardsCountData,
  maxData,
  minCardsCountData,
  minData,
  pageCountData,
  pageData,
  searchData,
  showPackCardsData,
  sortPacks,
} from 'common/selectors/packs-selector'

export const PacksList = (props: any) => {
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

  const {
    getPacksTC,
    createNewPackTC,
    deletePackTC,
    updatePackTC,
    setSort,
    updatePacksPagination,
    updateSearch,
    updateShowPackCards,
  } = useActions(packThunks)

  const createNewPackHandler = (packName: string, isPrivatePack: boolean, deckCover: string) => {
    const cardsPack = {
      cardsPack: { name: packName, deckCover: deckCover, private: isPrivatePack },
    }

    createNewPackTC(cardsPack)
  }

  const sortingHandler = (sortPacks: string) => {
    setSort({ sortPacks })
  }

  const deletePackHandler = (packId: string) => {
    deletePackTC(packId)
  }

  const openPackHandler = (packId: string) => {
    navigate(`/packPage/${packId}`)
  }

  const updatePackHandler = (
    packId: string,
    packName: string,
    isPrivatePack: boolean,
    cover: string
  ) => {
    updatePackTC({
      cardsPack: { _id: packId, name: packName, private: isPrivatePack, deckCover: cover },
    })
  }

  const changePaginationHandler = (page: number, pageCount: number) => {
    updatePacksPagination({ page, pageCount })
  }

  const changeSearchHandler = (newValue: string | undefined) => {
    updateSearch({ newValue })
  }

  const updShowPackCards = (butValue: ShowPackCardsType) => {
    updateShowPackCards({ butValue })
    setSearchParams({ accessory: butValue })
  }

  useEffect(() => {
    const params: SearchPramsType = Object.fromEntries(searchParams)
    const accessory = params.accessory || 'all'

    updateShowPackCards({ butValue: accessory })
    getPacksTC({})
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
            <PacksTable
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
