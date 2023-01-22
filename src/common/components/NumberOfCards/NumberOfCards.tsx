import React, { useCallback, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { RequestStatusType } from '../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { getPacksTC, setCardsCount } from '../../../features/PacksList/packsList-reducer'
import { isLoading } from '../../selectors/app-selector'
import {
  maxCardsCountData,
  maxData,
  minCardsCountData,
  minData,
} from '../../selectors/packs-selector'

import s from './NumberOfCards.module.scss'

export const NumberOfCards = () => {
  const status = useAppSelector<RequestStatusType>(isLoading)
  const minCardsCount = useAppSelector<number>(minCardsCountData)
  const maxCardsCount = useAppSelector<number>(maxCardsCountData)
  const min = useAppSelector<number>(minData)
  const max = useAppSelector<number>(maxData)
  const dispatch = useAppDispatch()

  const [value, setValue] = useState<number[]>([min, max])

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])

  // useEffect(() => {
  //   if (value[0] === min && value[1] === max) return
  //   setValue([min, max])
  // }, [min, max])

  const handleChange1 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const changeCommitted = useCallback(() => {
    dispatch(setCardsCount({ values: value }))
    dispatch(getPacksTC())
  }, [value])

  return (
    <div className={s.main}>
      <p className={s.title}>Number of cards</p>
      <div className={s.sliderBlock}>
        <div className={s.value}>{value[0]}</div>
        <Box sx={{ width: 155 }} className={s.slider}>
          <Slider
            min={minCardsCount}
            max={maxCardsCount}
            getAriaLabel={() => 'Minimum distance'}
            value={value}
            onChange={handleChange1}
            onChangeCommitted={changeCommitted}
            disableSwap
            color={'secondary'}
            disabled={status === 'loading'}
          />
        </Box>
        <div className={s.value}>{value[1]}</div>
      </div>
    </div>
  )
}
