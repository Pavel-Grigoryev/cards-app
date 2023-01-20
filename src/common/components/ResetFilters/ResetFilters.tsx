import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from '../../../app/store'
import { resetFilters } from '../../../features/PacksList/packsList-reducer'

export const defaultFilterValues = {
  page: 1,
  sortPacks: '',
  pageCount: 8,
  search: '',
} as const

export const ResetFilters = () => {
  const dispatch = useAppDispatch()

  return (
    <IconButton
      onClick={() => dispatch(resetFilters(defaultFilterValues))}
      title={'Reset all filters'}
    >
      <FilterAltOffIcon fontSize={'large'} />
    </IconButton>
  )
}
