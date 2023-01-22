import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import { useDebounce } from '../../hooks/useDebounce'
import { SearchPaperSXType } from '../../styles/sx/sx_styles'

import s from './Search.module.scss'

export const Search = memo(({ value, onChange, paperStyle }: SearchPropsType) => {
  const [title, setTitle] = useState<string | undefined>(value)

  const debouncedValue = useDebounce<string | undefined>(title, 700)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  useEffect(() => {
    if (title != value) {
      setTitle(value)
    }
  }, [value])

  useEffect(() => {
    onChange(title)
  }, [debouncedValue])

  return (
    <div>
      <p className={s.title}>Search</p>
      <Paper component="form" sx={{ ...paperStyle }}>
        <SearchIcon sx={{ opacity: '0.5' }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Provide your text"
          value={title}
          onChange={onChangeHandler}
        />
      </Paper>
    </div>
  )
})

//Types

type SearchPropsType = {
  value: string | undefined
  onChange: (newValue: string | undefined) => void
  paperStyle: SearchPaperSXType
}
