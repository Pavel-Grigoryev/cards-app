import React, { ChangeEvent, FC, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'

import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperModal } from '../../common/components/SuperModal/SuperModal'

import s from './AddNewPackModal.module.scss'

type AddNewPackModalPropsType = {
  title: string
  createNewPackHandler: (packName: string, isPrivatePack: boolean) => void
}

export const AddNewPackModal: FC<AddNewPackModalPropsType> = ({ title, createNewPackHandler }) => {
  const [packName, setPackName] = useState<string>('Name Pack')
  const [isPrivatePack, setIsPrivatePack] = useState<boolean>(false)

  const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }

  const onChangeSetCheckbox = () => {
    setIsPrivatePack(!isPrivatePack)
  }

  const handleAddNewPack = () => {
    createNewPackHandler(packName, isPrivatePack)
  }

  return (
    <SuperModal title={title} modalHeader={'Add new pack'}>
      <div className={s.wrapper}>
        <div className={s.inputs}>
          <InputLabel color={'secondary'}>Name pack</InputLabel>
          <Input
            id="standard-basic"
            onChange={onChangeSetLocalTitle}
            type={'text'}
            color={'secondary'}
            placeholder={'Name Pack'}
          />
          <FormControlLabel
            sx={{ alignSelf: 'flex-start' }}
            label={'Private pack'}
            control={
              <Checkbox
                color={'secondary'}
                checked={isPrivatePack}
                onChange={onChangeSetCheckbox}
              />
            }
          />
        </div>
        <div className={s.buttons}>
          <SuperButton
            title={'Save'}
            styleSX={{
              mt: '30px',
              width: '40%',
            }}
            onClick={handleAddNewPack}
          />
        </div>
      </div>
    </SuperModal>
  )
}
