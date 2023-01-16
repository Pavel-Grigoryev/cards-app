import React from 'react'

import { useAppDispatch } from '../../app/store'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'

import { createNewPackTC, getPacksTC } from './packsList-reducer'

export const PacksList = () => {
  const dispatch = useAppDispatch()

  const createNewPackHandler = () => {
    const cardsPack = {
      cardsPack: {
        name: 'new Name',
        deckCover: '',
        private: false,
      },
    }

    dispatch(createNewPackTC(cardsPack))
  }

  const getPacksHandler = () => {
    dispatch(getPacksTC({}))
  }

  return (
    <>
      <div>
        <h1>Packs list</h1>
        <SuperButton title={'Add new pack'} onClick={createNewPackHandler} />
        <div></div>
        <SuperButton title={'get packs'} onClick={getPacksHandler} />
        {/*  Кнопка добавления нового пака */}
      </div>
      <div>
        {/*  Компонента для всех параментров поиска */}
        {/*  Компонента для таблицы */}
      </div>
      {/*  Пагинация */}
    </>
  )
}
