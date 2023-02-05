import React, { ChangeEvent, FC, memo, useRef, useState } from 'react'

import { NEW_CARD } from '../../constants/newCardEmptyProp'

import s from './InputQuestion.module.scss'

import noImg from 'assets/images/noImage.jpg'
import styles from 'common/styles/errors.module.scss'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

type InputQuestionType = {
  title: string
  onChangeImg: (newImg: string) => void
  formikTouched?: boolean | undefined
  formikErrors?: string | undefined
  currentImg?: string
}

export const InputQuestion: FC<InputQuestionType> = memo(
  ({ title, onChangeImg, formikTouched, formikErrors, currentImg }) => {
    const [questImq, setQuestImq] = useState(
      currentImg && currentImg !== NEW_CARD.EMPTY_IMG ? currentImg : noImg
    )
    const [isImgBroken, setIsImgBroken] = useState(false)

    const errorHandler = () => {
      setIsImgBroken(true)
      onChangeImg('')
      setQuestImq('')
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
            onChangeImg(file64)
            setIsImgBroken(false)
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
          <button type={'button'} className={s.inputButton} onClick={selectFileHandler}>
            Change cover
          </button>
          <input
            type="file"
            onChange={uploadHandler}
            ref={inputRef}
            style={{ display: 'none' }}
            accept={'image/*'}
          />
        </div>
        <div className={s.imgBlock}>
          <div className={s.imgWrap}>
            <img
              className={s.image}
              src={isImgBroken ? noImg : questImq}
              onError={errorHandler}
              alt="User image"
            />
          </div>
          <div className={styles.errorText}>
            {formikTouched && formikErrors && <span>{formikErrors}</span>}
            {!questImq && <span>. This file is not supported (only jpg, png, svg) </span>}
          </div>
        </div>
      </>
    )
  }
)
