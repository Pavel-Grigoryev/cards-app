import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'

import { createNewPackTC, getPacksTC } from './packsList-reducer'

const packsListTableNames = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packsData = useAppSelector(state => state.packs.packList)

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
        <SuperTable headerNames={packsListTableNames} bodyData={packsData} />
      </div>
      <SuperPagination page={1} itemsCountForPage={4} totalCount={500} onChange={() => {}} />
    </>
  )
}
