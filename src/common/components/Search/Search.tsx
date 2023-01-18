import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

export const Search = () => {
  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <SearchIcon />
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Provide your text" />
      </Paper>
    </>
  )
}
