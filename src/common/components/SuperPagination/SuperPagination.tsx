import React from 'react'

import Pagination from '@mui/material/Pagination'

import SuperSelect from '../SuperSelect/SuperSelect'

import s from './SuperPagination.module.scss'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = 'pagination',
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage) // number of pages

  const onChangeCallback = (event: any, page: number) => {
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (event: any) => {
    onChange(page, +event.currentTarget.value)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={
          {
            // стили для Pagination
          }
        }
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        color="secondary"
        shape="rounded"
      />

      <span className={s.text1}>Show</span>

      <SuperSelect
        id={id + '-pagination-select'}
        className={id + '-pagination-select'}
        value={itemsCountForPage}
        options={[
          { id: 4, value: 4 },
          { id: 8, value: 8 },
          { id: 10, value: 10 },
        ]}
        onChange={onChangeSelect}
      />

      <span className={s.text2}>Cards per page</span>
    </div>
  )
}
