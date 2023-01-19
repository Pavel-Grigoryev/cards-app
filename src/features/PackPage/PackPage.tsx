import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { CardType } from '../../app/api'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { ReturnLink } from '../../common/components/ReturnLink/ReturnLink'
import { Search } from '../../common/components/Search/Search'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { PATH } from '../../common/routes/routes'
import {
  cardsData,
  cardsTotalCountData,
  pageCountData,
  pageData,
  searchData,
  userPackIdtData,
} from '../../common/selectors/cards-selector'
import { userIdData } from '../../common/selectors/profile-selector'
import { SearchPaperSX } from '../../common/styles/sx/sx_styles'

import {
  createCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardsPagination,
  updateCardsSearch,
  updateCardTC,
} from './packPage-reducer'
import s from './PackPage.module.scss'

// const packPageTableNames = ['Question', 'Answer', 'Last Updated', 'Grade']

const packPageTableNames = [
  { name: 'Question', sortName: 'question' },
  { name: 'Answer', sortName: 'answer' },
  { name: 'Last Updated', sortName: 'updated' },
  { name: 'Grade', sortName: 'grade' },
  { name: 'Actions', sortDirection: '' },
]

export const PackPage = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector<CardType[]>(cardsData)
  const search = useAppSelector<string | undefined>(searchData)
  const page = useAppSelector<number>(pageData)
  const pageCount = useAppSelector<number>(pageCountData)
  const cardsTotalCount = useAppSelector<number>(cardsTotalCountData)
  const userPackId = useAppSelector<string>(userPackIdtData)
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
      dispatch(getCardsTC({ cardsPack_id: id, cardQuestion: search, page, pageCount }))
    }
  }, [search, page, pageCount])
  // console.log(cards)

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
        {/*  Кнопка Learn new pack или add new card (если пак свой)  */}
      </div>
      <div>
        {/* Если пак пустой - кнопка Add new card */}
        {/* ELSE */}
        {/*  Компонента для поиска */}
        {/*  Компонента для таблицы */}
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
