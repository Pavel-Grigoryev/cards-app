import React, { FC, useState } from 'react'

import Button from '@mui/material/Button'

import { SuperModal } from '../../../common/components/SuperModal/SuperModal'

import s from './DeleteModal.module.scss'

export const DeleteModal: FC<DeleteCardModalPropsType> = ({
  title,
  name,
  deleteItem,
  disabledButton,
  type,
}) => {
  const [open, setOpen] = useState(false)

  const deleteHandler = () => {
    deleteItem()
    setOpen(false)
  }
  const header = type === 'pack' ? 'Delete Pack' : 'Delete Card'

  return (
    <>
      <SuperModal
        title={title}
        modalHeader={header}
        open={open}
        handleOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
        disabledButton={disabledButton}
      >
        <div className={s.wrapper}>
          <p className={s.desc}>
            Do you really want to remove <span className={s.name}>{name}</span>? All cards will be
            deleted.
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
      </SuperModal>
    </>
  )
}

type DeleteCardModalPropsType = {
  title: any
  name: string
  deleteItem: () => void
  disabledButton: boolean
  type: string
}
