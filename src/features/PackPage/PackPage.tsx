import React, { useEffect } from 'react'

import { CardType } from '../../app/api'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { cardsData } from '../../common/selectors/cards-selector'

import { getCardsTC } from './packPage-reducer'

const packPageTableNames = ['Question', 'Answer', 'Last Updated', 'Grade']

export const PackPage = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector<CardType[]>(cardsData)

  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: '63c416a4025403b6ce37c1d1' }))
  }, [])

  return (
    <>
      <div>
        <h1>Name pack</h1>
        {/*  Кнопка Learn new pack или add new card (если пак свой)  */}
      </div>
      <div>
        {/* Если пак пустой - кнопка Add new card */}
        {/* ELSE */}
        {/*  Компонента для поиска */}
        {/*  Компонента для таблицы */}
        <SuperTable headerNames={packPageTableNames} bodyData={cards} />
      </div>
      {/*  Пагинация */}
    </>
  )
}
