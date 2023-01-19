import React, { useEffect } from 'react'

import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { CardType } from '../../app/api'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { ReturnLink } from '../../common/components/ReturnLink/ReturnLink'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { PATH } from '../../common/routes/routes'
import { cardsData } from '../../common/selectors/cards-selector'
import s from '../PacksList/PacksList.module.scss'

import { createCardTC, deleteCardTC, getCardsTC, updateCardTC } from './packPage-reducer'

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
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const createNewCardHandler = () => {
    dispatch(createCardTC({ card: { cardsPack_id: location.state.packId } }))
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

  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: location.state.packId }))
    setSearchParams({ packId: location.state.packId, userId: location.state.userId })
  }, [])
  // console.log(cards)

  return (
    <>
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <div className={s.head}>
        <h1>Name pack</h1>
        <SuperButton title={'Add new card'} onClick={createNewCardHandler} />
        {/*  Кнопка Learn new pack или add new card (если пак свой)  */}
      </div>
      <div>
        {/* Если пак пустой - кнопка Add new card */}
        {/* ELSE */}
        {/*  Компонента для поиска */}
        {/*  Компонента для таблицы */}
        <SuperTable
          headerNames={packPageTableNames}
          bodyData={cards}
          deleteHandler={deleteCardHandler}
          updateHandler={updateCardHandler}
        />
      </div>
      <SuperPagination page={1} itemsCountForPage={8} totalCount={32} onChange={() => {}} />
    </>
  )
}
