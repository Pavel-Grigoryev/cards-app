import React from 'react'

import { ShowPackCardsType } from '../../../features/PacksList/packsList-reducer'
import { SearchPaperSX } from '../../styles/sx/sx_styles'
import { NumberOfCards } from '../NumberOfCards/NumberOfCards'
import { ResetFilters } from '../ResetFilters/ResetFilters'
import { Search } from '../Search/Search'
import { ShowPacksCards } from '../ShowPacksCards/ShowPacksCards'

import s from './Filters.module.scss'

export const Filters = (props: FiltersPropsType) => {
  const { value, onChange, showPackCards, updShowPackCards } = props

  const changeShowPacksCardsHandler = (butValue: ShowPackCardsType) => {
    updShowPackCards(butValue)
  }

  return (
    <div className={s.filterCont}>
      <Search value={value} onChange={onChange} paperStyle={SearchPaperSX} />
      <ShowPacksCards value={showPackCards} onChange={changeShowPacksCardsHandler} />
      <NumberOfCards
        min={props.min}
        max={props.max}
        minCardsCount={props.minCardsCount}
        maxCardsCount={props.maxCardsCount}
      />
      <ResetFilters />
    </div>
  )
}

//Types

type FiltersPropsType = {
  value: string | undefined
  onChange: (newValue: string | undefined) => void
  showPackCards: ShowPackCardsType
  min: number
  max: number
  minCardsCount: number
  maxCardsCount: number
  updShowPackCards: (butValue: ShowPackCardsType) => void
}
