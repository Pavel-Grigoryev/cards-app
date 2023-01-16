import React, { ChangeEvent, memo, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import s from './EditableSpan.module.scss'
import editIcon from './editIcon.svg'

type EditableSpanPropsType = {
  value: string | undefined
  onChange: (newValue: string | undefined) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState<string | undefined>(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <div className={s.fieldBlock}>
      <TextField
        color="secondary"
        className={s.field}
        id="standard-basic"
        label="Nickname"
        variant="standard"
        fullWidth
        value={title}
        autoFocus
        onChange={onChangeSetLocalTitle}
      />
      <div className={s.butCont}>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={activateViewMode}
          style={{
            fontSize: '12px',
            padding: '4px 10px',
          }}
        >
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div className={s.spanBlock}>
      <span className={s.span} onDoubleClick={activateEditMode}>
        {props.value}
      </span>
      <img src={editIcon} className={s.pen} alt={'edit'} />
    </div>
  )
})
