import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: '12px 24px 36px',
}

type ModalPropsType = {
  children: ReactNode
  title: ReactNode
}

export const SuperModal: FC<ModalPropsType> = ({ children, title }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (e: any) => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button sx={{ color: 'rgba(0,0,0,0.54)' }} onClick={handleOpen}>
        {title}
      </Button>
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
