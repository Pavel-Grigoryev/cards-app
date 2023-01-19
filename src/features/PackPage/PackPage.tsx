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
  /*const [searchParams, setSearchParams] = useSearchParams()*/
  const { id } = useParams<string>()

  console.log(location.state)
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

  useEffect(() => {
    if (id) {
      dispatch(getCardsTC({ cardsPack_id: id }))
    }
    /*setSearchParams({ packId: location.state.packId, userId: location.state.userId })*/
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
