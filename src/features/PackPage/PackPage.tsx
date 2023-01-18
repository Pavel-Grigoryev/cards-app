import React, { useEffect } from 'react'

import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { CardType } from '../../app/api'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { cardsData } from '../../common/selectors/cards-selector'

import { createCardTC, deleteCardTC, getCardsTC, updateCardTC } from './packPage-reducer'

const packPageTableNames = ['Question', 'Answer', 'Last Updated', 'Grade']

export const PackPage = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector<CardType[]>(cardsData)
  const location = useLocation()

  console.log(location.state)
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

  //F - 63c6d54804a18423fc50138e
  //
  //M - 63c416a4025403b6ce37c1d1
  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: location.state.packId }))
  }, [])
  // console.log(cards)

  return (
    <>
      <div>
        <h1>Name pack</h1>
        {/*  Кнопка Learn new pack или add new card (если пак свой)  */}
      </div>
      <div>
        <SuperButton title={'Add new card'} onClick={createNewCardHandler} />
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
