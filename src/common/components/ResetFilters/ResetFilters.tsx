import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from '../../../app/store'
import { resetFilters } from '../../../features/PacksList/packsList-reducer'

import s from './ResetFilters.module.scss'

export const ResetFilters = () => {
  const dispatch = useAppDispatch()

  const resetFiltersHandler = () => {
    dispatch(resetFilters())
  }

  return (
    <div className={s.filter}>
      <IconButton onClick={() => resetFiltersHandler()} title={'Reset all filters'}>
        <FilterAltOffIcon fontSize={'large'} />
      </IconButton>
    </div>
  )
}
