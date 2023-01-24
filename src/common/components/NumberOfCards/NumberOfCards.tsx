import React, { useCallback, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { RequestStatusType } from '../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { setCardsCount } from '../../../features/PacksList/packsList-reducer'
import { isLoading } from '../../selectors/app-selector'

import s from './NumberOfCards.module.scss'

export const NumberOfCards = (props: NumberOfCardsType) => {
  const status = useAppSelector<RequestStatusType>(isLoading)
  const dispatch = useAppDispatch()

  const [value, setValue] = useState<number[]>([props.min, props.max])

  useEffect(() => {
    setValue([props.minCardsCount, props.maxCardsCount])
  }, [props.minCardsCount, props.maxCardsCount])

  const handleChange1 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const changeCommitted = useCallback(() => {
    dispatch(setCardsCount({ values: value }))
  }, [value])

  return (
    <div className={s.main}>
      <p className={s.title}>Number of cards</p>
      <div className={s.sliderBlock}>
        <div className={s.value}>{value[0]}</div>
        <Box sx={{ width: 155 }} className={s.slider}>
          <Slider
            min={props.minCardsCount}
            max={props.maxCardsCount}
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

type NumberOfCardsType = {
  min: number
  max: number
  minCardsCount: number
  maxCardsCount: number
}
