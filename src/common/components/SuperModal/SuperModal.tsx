import React, { FC, PropsWithChildren, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import { StyleSXPropsType, SuperButton } from '../SuperButton/SuperButton'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type ModalPropsType = {
  title: string | ReactNode
  modalHeader: string
  open: boolean
  handleClose: () => void
  handleOpen: () => void
  styleSX?: StyleSXPropsType
}

export const SuperModal: FC<PropsWithChildren<ModalPropsType>> = ({
  children,
  title,
  modalHeader,
  open,
  handleClose,
  handleOpen,
}) => {
  return (
    <div>
      {typeof title === 'string' ? (
        <SuperButton title={title} onClick={handleOpen} />
      ) : (
        <Button
          sx={{ color: 'rgba(0,0,0,0.54)', minWidth: '0px' }}
          variant="text"
          onClick={handleOpen}
        >
          {title}
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
