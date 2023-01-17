import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { getPacksTC } from '../PacksList/packsList-reducer'

import { getCardsTC } from './packPage-reducer'

const packPageTableNames = ['Question', 'Answer', 'Last Updated', 'Grade']

export const PackPage = () => {
  const dispatch = useAppDispatch()
  const cardsData = useAppSelector(state => state.cards.cardList)

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
        <SuperTable headerNames={packPageTableNames} bodyData={cardsData} />
      </div>
      {/*  Пагинация */}
    </>
  )
}
