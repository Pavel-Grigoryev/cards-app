import React, { useCallback, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { updateProfileTC } from '../../../features/Profile/profile-reducer'
import { EditableSpan } from '../EditableSpan/EditableSpan'

function valuetext(value: number) {
  return `${value}`
}

const minDistance = 0

export const NumberOfCards = () => {
  const [value1, setValue1] = useState<number[]>([0, 37])

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }
  }

  // const onChangeMinCardsHandler = useCallback(
  //   (name: string | undefined) => {
  //     dispatch(updateProfileTC({ name }))
  //   },
  //   [dispatch]
  // )

  return (
    <div>
      {/*<EditableSpan value={value1[0].toString()} onChange={onChangeMinCardsHandler} />*/}
      <Box sx={{ width: 155 }}>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          color={'secondary'}
        />
      </Box>
    </div>
  )
}
