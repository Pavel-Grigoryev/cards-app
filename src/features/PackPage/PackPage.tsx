import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { CardType } from '../../app/api/cardsAPI/cardsAPITypes'
import { RequestStatusType } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { NotFound } from '../../common/components/NotFound/NotFound'
import { Preloader } from '../../common/components/Preloader/Preloader'
import { ReturnLink } from '../../common/components/ReturnLink/ReturnLink'
import { Search } from '../../common/components/Search/Search'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { PATH } from '../../common/routes/routes'
import { isLoading } from '../../common/selectors/app-selector'
import {
  cardsData,
  cardsTotalCountData,
  pageCountData,
  pageData,
  searchData,
  sortCards,
  packUserId,
} from '../../common/selectors/cards-selector'
import { userIdData } from '../../common/selectors/profile-selector'
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
  const userPackId = useAppSelector<string>(packUserId)
  const userId = useAppSelector<string>(userIdData)
  const packName = useAppSelector<string>(state => state.cards.packName)

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
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <div className={s.head}>
        <h1>{packName}</h1>
        {userPackId === userId ? (
          <SuperButton title={'Add new card'} onClick={createNewCardHandler} />
        ) : (
          <SuperButton title={'Learn to pack'} onClick={() => {}} />
        )}
      </div>
      <div>
        <div className={s.searchBlock}>
          <Search
            value={search}
            onChange={changeSearchHandler}
            paperStyle={{ ...SearchPaperSX, width: '100%' }}
          />
        </div>

        {cardsTotalCount ? (
          <div className={s.wrapper}>
            {status === 'loading' && <Preloader contStyle={{ opacity: '0.5' }} />}
            <SuperTable
              headerNames={packPageTableNames}
              bodyData={cards}
              deleteHandler={deleteCardHandler}
              updateHandler={updateCardHandler}
              sortingHandler={sortingHandler}
            />
            <SuperPagination
              page={page}
              itemsCountForPage={pageCount}
              totalCount={cardsTotalCount}
              onChange={changePaginationHandler}
            />
          </div>
        ) : (
          <NotFound
            message={'Cards not found. Add a card to this pack or change your search options.'}
          />
        )}
      </div>
    </>
  )
}
