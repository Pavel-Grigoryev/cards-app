import React, { useEffect } from 'react'

import { PackType } from '../../app/api'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTable } from '../../common/components/SuperTable/SuperTable'
import {
  cardPacksTotalCountData,
  packsData,
  pageCountData,
  pageData,
} from '../../common/selectors/packs-selector'

import { createNewPackTC, getPacksTC, updatePacksPagination,deletePackTC, updatePackTC } from './packsList-reducer'

const packsListTableNames = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector<PackType[]>(packsData)
  const page = useAppSelector<number>(pageData)
  const pageCount = useAppSelector<number>(pageCountData)
  const cardPacksTotalCount = useAppSelector<number>(cardPacksTotalCountData)

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

  const changePaginationHandler = (page: number, pageCount: number) => {
    dispatch(updatePacksPagination({ page, pageCount }))
  }

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, pageCount])

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
      <SuperPagination
        page={page}
        itemsCountForPage={pageCount}
        totalCount={cardPacksTotalCount}
        onChange={changePaginationHandler}
      />
    </>
  )
}
