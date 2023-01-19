import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import { useDebounce } from '../../hooks/useDebounce'

import s from './Search.module.scss'

export const Search = memo(({ value, onChange }: SearchPropsType) => {
  const [title, setTitle] = useState<string | undefined>(value)

  const debouncedValue = useDebounce<string | undefined>(title, 700)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  useEffect(() => {
    onChange(title)
  }, [debouncedValue])

  return (
    <div>
      <p className={s.title}>Search</p>
      <Paper
        component="form"
        sx={{
          p: '2px 4px 2px 16px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          height: 36,
        }}
      >
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
}
