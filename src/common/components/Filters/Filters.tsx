import React from 'react'

import { useAppDispatch } from '../../../app/store'
import {
  ShowPackCardsType,
  updateShowPackCards,
} from '../../../features/PacksList/packsList-reducer'
import { SearchPaperSX } from '../../styles/sx/sx_styles'
import { NumberOfCards } from '../NumberOfCards/NumberOfCards'
import { ResetFilters } from '../ResetFilters/ResetFilters'
import { Search } from '../Search/Search'
import { ShowPacksCards } from '../ShowPacksCards/ShowPacksCards'

import s from './Filters.module.scss'

export const Filters = (props: FiltersPropsType) => {
  const { value, onChange, showPackCards } = props
  const dispatch = useAppDispatch()

  const changeShowPacksCardsHandler = (butValue: ShowPackCardsType) => {
    dispatch(updateShowPackCards({ butValue }))
  }

  return (
    <div className={s.filterCont}>
      <Search value={value} onChange={onChange} paperStyle={SearchPaperSX} />
      <ShowPacksCards value={showPackCards} onChange={changeShowPacksCardsHandler} />
      <NumberOfCards />
      <ResetFilters />
    </div>
  )
}

//Types

type FiltersPropsType = {
  value: string | undefined
  onChange: (newValue: string | undefined) => void
  showPackCards: ShowPackCardsType
}
