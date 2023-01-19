import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { CardType } from '../../app/api'
import { RequestStatusType } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { Search } from '../../common/components/Search/Search'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { isLoading } from '../../common/selectors/app-selector'
import {
  cardsData,
  cardsTotalCountData,
  pageCountData,
  pageData,
  searchData,
  sortCards,
} from '../../common/selectors/cards-selector'
import { SearchPaperSX } from '../../common/styles/sx/sx_styles'
import { packPageTableNames } from '../../common/utils/tableHeaderData'

import {
  createCardTC,
  deleteCardTC,
  getCardsTC,
  setSortCards,
  updateCardsPagination,
  updateCardsSearch,
  updateCardTC,
} from './packPage-reducer'
import s from './PackPage.module.scss'

export const PackPage = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector<CardType[]>(cardsData)
  const status = useAppSelector<RequestStatusType>(isLoading)
  const search = useAppSelector<string | undefined>(searchData)
  const page = useAppSelector<number>(pageData)
  const pageCount = useAppSelector<number>(pageCountData)
  const cardsTotalCount = useAppSelector<number>(cardsTotalCountData)
  const sort = useAppSelector<string>(sortCards)

  const { id } = useParams<string>()

  const createNewCardHandler = () => {
    if (id) {
      dispatch(createCardTC({ card: { cardsPack_id: id } }))
    }
  }

  const deleteCardHandler = (cardId: string) => {
    dispatch(deleteCardTC(cardId))
  }

  const sortingHandler = (sortCards: string) => {
    dispatch(setSortCards({ sortCards }))
  }

  const updateCardHandler = (cardId: string) => {
    dispatch(
      updateCardTC({
        card: {
          _id: cardId,
          question: 'new question',
        },
      })
    )
  }
  const changeSearchHandler = (newValue: string | undefined) => {
    dispatch(updateCardsSearch({ newValue }))
  }

  const changePaginationHandler = (page: number, pageCount: number) => {
    dispatch(updateCardsPagination({ page, pageCount }))
  }

  useEffect(() => {
    if (id) {
      dispatch(
        getCardsTC({ cardsPack_id: id, cardQuestion: search, page, pageCount, sortCards: sort })
      )
    }
  }, [search, page, pageCount, sort])

  return (
    <>
      <div>
        <h1>Name pack</h1>
        {/*  Кнопка Learn new pack или add new card (если пак свой)  */}
      </div>
      <div>
        <SuperButton title={'Add new card'} onClick={createNewCardHandler} />
        <div className={s.searchBlock}>
          <Search
            value={search}
            onChange={changeSearchHandler}
            paperStyle={{ ...SearchPaperSX, width: '100%' }}
          />
        </div>

        <SuperTable
          headerNames={packPageTableNames}
          bodyData={cards}
          deleteHandler={deleteCardHandler}
          updateHandler={updateCardHandler}
          sortingHandler={sortingHandler}
        />
      </div>
      <SuperPagination
        page={page}
        itemsCountForPage={pageCount}
        totalCount={cardsTotalCount}
        onChange={changePaginationHandler}
      />
    </>
  )
}
