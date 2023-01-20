import React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import s from './ShowPacksCards.module.scss'

export const ShowPacksCards = ({ value, onChange }: ShowPacksCardsType) => {
  const onChangeHandler = (e: any) => {
    onChange(e.currentTarget.value)
  }

  return (
    <div>
      <p className={s.title}>Show packs cards</p>
      <ToggleButtonGroup
        exclusive
        value={value}
        onChange={onChangeHandler}
        sx={{ backgroundColor: '#366eff', height: '36px' }}
      >
        <ToggleButton
          value="my"
          color={'primary'}
          sx={{ backgroundColor: '#fff', width: '98px', textTransform: 'capitalize' }}
        >
          My
        </ToggleButton>
        <ToggleButton
          value="all"
          color={'primary'}
          sx={{ backgroundColor: '#fff', width: '98px', textTransform: 'capitalize' }}
        >
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

//Types

type ShowPacksCardsType = {
  value: string
  onChange: (butValue: any) => void
}
