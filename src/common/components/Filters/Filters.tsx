import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from '../../../app/store'
import { resetFilters } from '../../../features/PacksList/packsList-reducer'
import { SearchPaperSX } from '../../styles/sx/sx_styles'
import { Search } from '../Search/Search'

import s from './Filters.module.scss'

export const defaultFilterValues = {
  page: 1,
  sortPacks: '',
  pageCount: 8,
  search: '',
} as const

export const Filters = (props: FiltersPropsType) => {
  const { value, onChange } = props
  const dispatch = useAppDispatch()

  return (
    <div className={s.filterCont}>
      <Search value={value} onChange={onChange} paperStyle={SearchPaperSX} />
      <IconButton
        onClick={() => dispatch(resetFilters(defaultFilterValues))}
        title={'Reset all filters'}
      >
        <FilterAltOffIcon fontSize={'large'} />
      </IconButton>
    </div>
  )
}

//Types

type FiltersPropsType = {
  value: string | undefined
  onChange: (newValue: string | undefined) => void
}
