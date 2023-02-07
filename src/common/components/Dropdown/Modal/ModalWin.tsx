import React, { FC, PropsWithChildren, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'

import { StyleSXPropsType } from '../../SuperButton/SuperButton'

import s from './ModalWin.module.scss'

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
  disabledButton?: boolean
  disabledSaveButton?: boolean
  img: string
}

export const ModalWin: FC<PropsWithChildren<ModalPropsType>> = ({
  children,
  title,
  modalHeader,
  open,
  handleClose,
  handleOpen,
  disabledButton,
  disabledSaveButton,
  img,
}) => {
  return (
    <div>
      <li className={s.linkBlock}>
        <button type={'button'} className={s.button} onClick={handleOpen}>
          <img className={s.image} src={img} alt="" />
          <span className={s.title}>{title}</span>
        </button>
      </li>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5 className={s.header}>
            {modalHeader}
            <span className={s.close}>
              <IconButton type={'button'} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </span>
          </h5>
          {children}
        </Box>
      </Modal>
    </div>
  )
}
