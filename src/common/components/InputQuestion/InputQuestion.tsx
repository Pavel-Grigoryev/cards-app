import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import IconButton from '@mui/material/IconButton'

import s from './InputQuestion.module.scss'

import { useAppSelector } from 'app/store'
import camera from 'assets/images/camera.png'
import noImg from 'assets/images/noImage.jpg'
import { avatarData } from 'common/selectors/profile-selector'
import { ProfileChangeAvaButton } from 'common/styles/sx/sx_styles'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

type InputQuestionType = {
  title: string
  formikGetFieldProps: any
}

export const InputQuestion: FC<InputQuestionType> = ({ title, formikGetFieldProps }) => {
  const [isImgBroken, setIsImgBroken] = useState(false)
  const [questImq, setQuestImq] = useState(noImg)

  const avatar = 'fdfdf'

  // useEffect(() => {
  //   setIsImgBroken(false)
  // }, [avatar])

  const errorHandler = () => {
    setIsImgBroken(true)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setQuestImq(file64)
          setIsImgBroken(false)
          //onChangeImg(file64)
        })
      } else {
        console.error('Error: ', 'The file is too large')
      }
    }
  }

  return (
    <>
      <div className={s.linkBlock}>
        <p className={s.inputTitle}>{title}</p>
        <button className={s.inputButton} onClick={selectFileHandler}>
          Change cover
        </button>
        <input
          type="file"
          {...formikGetFieldProps}
          ref={inputRef}
          style={{ display: 'none' }}
          accept={'image/*'}
        />
      </div>
      <div className={s.imgWrap}>
        <img
          className={s.image}
          src={isImgBroken ? noImg : questImq}
          onError={errorHandler}
          alt="User image"
        />
      </div>
    </>
  )
}
