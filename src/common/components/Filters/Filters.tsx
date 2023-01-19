import React from 'react'

import { SearchPaperSX } from '../../styles/sx/sx_styles'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from '../../../app/store'
import { setSort } from '../../../features/PacksList/packsList-reducer'
import { Search } from '../Search/Search'

import s from './Filters.module.scss'

export const Filters = (props: FiltersPropsType) => {
  const { value, onChange } = props
  const dispatch = useAppDispatch()

  return (
    <div className={s.filterCont}>
      <Search value={value} onChange={onChange} paperStyle={SearchPaperSX} />
      <IconButton onClick={() => dispatch(setSort({ sortPacks: '' }))} title={'Reset all filters'}>
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
