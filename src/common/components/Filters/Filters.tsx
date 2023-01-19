import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from '../../../app/store'
import { setSort } from '../../../features/PacksList/packsList-reducer'
import { Search } from '../Search/Search'

import s from './Filters.module.scss'

export const Filters = () => {
  const dispatch = useAppDispatch()

  return (
    <div className={s.filterCont}>
      <Search />
      <IconButton onClick={() => dispatch(setSort({ sortPacks: '' }))} title={'Reset all filters'}>
        <FilterAltOffIcon fontSize={'large'} />
      </IconButton>
    </div>
  )
}
