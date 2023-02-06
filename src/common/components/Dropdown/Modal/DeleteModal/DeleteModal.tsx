import React, { FC, useState } from 'react'

import Button from '@mui/material/Button'

import { ModalWin } from '../ModalWin'

import s from './DeleteModal.module.scss'

export const DeleteModal: FC<DeleteCardModalPropsType> = ({
  title,
  name,
  deleteItem,
  disabledButton,
  type,
  img,
}) => {
  const [open, setOpen] = useState(false)

  const deleteHandler = () => {
    deleteItem()
    setOpen(false)
  }
  const header = type === 'pack' ? 'Delete Pack' : 'Delete Card'

  return (
    <>
      <ModalWin
        title={title}
        open={open}
        modalHeader={'Delete pack'}
        handleOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
        disabledButton={disabledButton}
        img={img}
      >
        <div className={s.wrapper}>
          <p className={s.desc}>
            <span>Do you really want to remove</span> <span className={s.name}>{name}</span>
            <span>? All cards will be deleted.</span>
          </p>
          <div className={s.buttons}>
            <Button
              onClick={deleteHandler}
              variant={'contained'}
              color={'error'}
              sx={{
                mt: '30px',
                width: '40%',
                fontSize: '16px',
                textTransform: 'capitalize',
                borderRadius: '9999px',
                padding: '4px 16px',
                backgroundColor: '#FF3636',
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </ModalWin>
    </>
  )
}

type DeleteCardModalPropsType = {
  title: any
  name: string
  deleteItem: () => void
  disabledButton: boolean
  type: string
  img: string
}
