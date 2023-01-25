import React, { FC, PropsWithChildren, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { SuperButton } from '../SuperButton/SuperButton'

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
  title: any
  modalHeader: string
}

export const SuperModal: FC<PropsWithChildren<ModalPropsType>> = ({
  children,
  title,
  modalHeader,
}) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <div>
      {/*<Button onClick={handleOpen}>{title}</Button>*/}
      <SuperButton title={title} onClick={handleOpen} />
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
