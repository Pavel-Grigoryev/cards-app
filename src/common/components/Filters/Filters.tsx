import React from 'react'

import { Search } from '../Search/Search'

import s from './Filters.module.scss'

export const Filters = (props: FiltersPropsType) => {
  const { value, onChange } = props

  return (
    <div className={s.filterCont}>
      <Search value={value} onChange={onChange} />
    </div>
  )
}

//Types

type FiltersPropsType = {
  value: string | undefined
  onChange: (newValue: string | undefined) => void
}
