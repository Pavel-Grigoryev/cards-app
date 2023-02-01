import React, { ChangeEvent, FC, useRef, useState } from 'react'

import s from './InputQuestion.module.scss'

import noImg from 'assets/images/noImage.jpg'
import styles from 'common/styles/errors.module.scss'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

type InputQuestionType = {
  title: string
  onChangeImg: (newImg: string) => void
  formikTouched?: boolean | undefined
  formikErrors?: string | undefined
}

export const InputQuestion: FC<InputQuestionType> = ({
  title,
  onChangeImg,
  formikTouched,
  formikErrors,
}) => {
  const [isImgBroken, setIsImgBroken] = useState(false)
  const [questImq, setQuestImq] = useState(noImg)

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
          onChangeImg(file64)
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
        {formikTouched && formikErrors && <div className={styles.errorText}>{formikErrors}</div>}
      </div>
    </>
  )
}
