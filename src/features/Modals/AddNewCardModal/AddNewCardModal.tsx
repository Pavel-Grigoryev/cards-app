import React, { FC, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import s from './AddNewCardModal.module.scss'

import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperModal } from 'common/components/SuperModal/SuperModal'

type AddNewCardModalPropsType = {
  title: string
  createNewCardHandler: (question: string, answer: string) => void
}

export const AddNewCardModal: FC<AddNewCardModalPropsType> = ({ title, createNewCardHandler }) => {
  const [mode, setMode] = useState<string>('text')

  // const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
  //   setPackName(e.currentTarget.value)
  // }

  const handleChange = (e: SelectChangeEvent<string>) => {
    debugger
    setMode(e.target.value)
  }

  // const handleAddNewPack = () => {
  //   createNewPackHandler(packName, isPrivatePack)
  // }

  return (
    <SuperModal title={title} modalHeader={'Add new card'}>
      <div className={s.wrapper}>
        <div className={s.inputs}>
          <FormControl fullWidth>
            <InputLabel color={'secondary'} id="demo-simple-select-label">
              Choose a question format
            </InputLabel>
            <Select
              color={'secondary'}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mode}
              label="Choose a question format"
              onChange={handleChange}
            >
              <MenuItem value={'text'}>Text</MenuItem>
              <MenuItem value={'image'}>Image</MenuItem>
            </Select>
          </FormControl>
          <InputLabel color={'secondary'}>Name pack</InputLabel>
          <Input
            id="standard-basic"
            onChange={() => {}}
            type={'text'}
            color={'secondary'}
            placeholder={'Name Pack'}
          />
        </div>
        <div className={s.buttons}>
          <SuperButton
            title={'Save'}
            styleSX={{
              mt: '30px',
              width: '40%',
            }}
            onClick={() => {}}
          />
        </div>
      </div>
    </SuperModal>
  )
}
