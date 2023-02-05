import React, { FC, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { ModeType } from '../AddNewCardModal/AddNewCardModal'

import s from './EditCardModal.module.scss'
import { InputImg } from './InputImg/InputImg'
import { InputText } from './InputText/InputText'

import { SuperModal } from 'common/components/SuperModal/SuperModal'

type EditCardModalPropsType = {
  title: any
  updateCard: (newQuestion: string, newAnswer: string, mode: ModeType) => void
  rowQuestion: string
  rowQuestionImg: string
  rowAnswer: string
  rowAnswerImg: string
  disabledButton: boolean
}

export const EditCardModal: FC<EditCardModalPropsType> = ({
  title,
  updateCard,
  rowQuestion,
  rowAnswer,
  disabledButton,
  rowQuestionImg,
  rowAnswerImg,
}) => {
  const [mode, setMode] = useState<ModeType>('text')
  const [open, setOpen] = useState(false)

  const handleChange = (e: SelectChangeEvent) => {
    setMode(e.target.value as ModeType)
  }

  const updateCardHandler = (newQuestion: string, newAnswer: string) => {
    updateCard(newQuestion, newAnswer, mode)
    setOpen(false)
  }

  return (
    <SuperModal
      open={open}
      handleOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
      title={title}
      modalHeader={'Edit cards'}
      disabledButton={disabledButton}
    >
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
          {mode === 'text' ? (
            <InputText
              rowQuestion={rowQuestion}
              rowAnswer={rowAnswer}
              updateCard={(newQuestion, newAnswer) => updateCardHandler(newQuestion, newAnswer)}
            />
          ) : (
            <div className={s.imageInputs}>
              <InputImg
                rowQuestionImg={rowQuestionImg}
                rowAnswerImg={rowAnswerImg}
                updateCard={(newQuestion, newAnswer) => updateCardHandler(newQuestion, newAnswer)}
              />
            </div>
          )}
        </div>
      </div>
    </SuperModal>
  )
}
