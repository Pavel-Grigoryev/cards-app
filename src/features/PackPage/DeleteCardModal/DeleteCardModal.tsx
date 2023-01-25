import React, { FC, PropsWithChildren, ReactNode } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import logoutImg from '../../../assets/images/logout.svg'
import { SuperModal } from '../../../common/components/SuperModal/SuperModal'

import s from './DeleteCardModal.module.scss'

export const DeleteCardModal: FC<ModalPropsType> = ({ title, id }) => {
  return (
    <>
      <SuperModal title={title}>
        <div className={s.titleBlock}>
          <h5 className={s.title}>Delete Pack</h5>
        </div>
        <IconButton onClick={() => {}}>
          <img className={s.logoutImg} src={logoutImg} alt="" />
        </IconButton>
      </SuperModal>
    </>
  )
}

type ModalPropsType = {
  title: ReactNode
  id: any
}
