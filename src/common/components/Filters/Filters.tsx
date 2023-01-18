import React from 'react'

import { Search } from '../Search/Search'

import s from './Filters.module.scss'

export const Filters = () => {
  return (
    <div className={s.filterCont}>
      <Search />
    </div>
  )
}
