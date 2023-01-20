import React from 'react'

import { SearchPaperSX } from '../../styles/sx/sx_styles'
import { ResetFilters } from '../ResetFilters/ResetFilters'
import { Search } from '../Search/Search'

import s from './Filters.module.scss'

export const Filters = (props: FiltersPropsType) => {
  const { value, onChange } = props

  return (
    <div className={s.filterCont}>
      <Search value={value} onChange={onChange} paperStyle={SearchPaperSX} />
      <ResetFilters />
    </div>
  )
}

//Types

type FiltersPropsType = {
  value: string | undefined
  onChange: (newValue: string | undefined) => void
}
