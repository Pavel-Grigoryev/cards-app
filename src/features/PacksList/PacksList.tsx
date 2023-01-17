import React, { useEffect } from 'react'

import { PackType } from '../../app/api'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { packsData } from '../../common/selectors/packs-selector'

import { createNewPackTC, getPacksTC } from './packsList-reducer'

const packsListTableNames = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector<PackType[]>(packsData)

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

  useEffect(() => {
    dispatch(getPacksTC({ pageCount: 8 }))
  }, [])

  return (
    <>
      <div>
        <h1>Packs list</h1>
        <SuperButton title={'Add new pack'} onClick={createNewPackHandler} />
        <div></div>
        {/*<SuperButton title={'get packs'} onClick={getPacksHandler} />*/}
        {/*  Кнопка добавления нового пака */}
      </div>
      <div>
        {/*  Компонента для всех параментров поиска */}
        {/*  Компонента для таблицы */}
        <SuperTable headerNames={packsListTableNames} bodyData={packs} />
      </div>
      {/*  Пагинация */}
    </>
  )
}
