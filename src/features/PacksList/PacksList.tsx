import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'

import { createNewPackTC, deletePackTC, getPacksTC, updatePackTC } from './packsList-reducer'

const packsListTableNames = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packsData = useAppSelector(state => state.packs.packList)

  const createNewPackHandler = () => {
    const cardsPack = {
      cardsPack: {
        name: 'No Name',
        deckCover: '',
        private: false,
      },
    }

    dispatch(createNewPackTC(cardsPack))
  }

  const deletePackHandler = (packId: string) => {
    dispatch(deletePackTC(packId))
  }

  const updatePackHandler = (packId: string) => {
    dispatch(
      updatePackTC({
        cardsPack: {
          _id: packId,
          name: 'New Name',
        },
      })
    )
  }

  useEffect(() => {
    dispatch(getPacksTC({ pageCount: 8 }))
  }, [])

  return (
    <>
      <div>
        <h1>Packs list</h1>
        <SuperButton title={'Add new pack'} onClick={createNewPackHandler} />
        {/*  Кнопка добавления нового пака */}
      </div>
      <div>
        {/*  Компонента для всех параментров поиска */}
        {/*  Компонента для таблицы */}
        <SuperTable
          headerNames={packsListTableNames}
          bodyData={packsData}
          deleteHandler={deletePackHandler}
          updateHandler={updatePackHandler}
        />
      </div>
      {/*  Пагинация */}
    </>
  )
}
