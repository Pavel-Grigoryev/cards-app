import React, { ChangeEvent, useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'

import { useActions } from '../../../common/hooks/useActions'
import { ProfileChangeAvaButton } from '../../../common/styles/sx/sx_styles'
import { profileThunks } from '../profile-reducer'

import s from './InputAvatar.module.scss'

import { useAppSelector } from 'app/store'
import camera from 'assets/images/camera.png'
import noAva from 'assets/images/no_avatar.svg'
import { avatarData } from 'common/selectors/profile-selector'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

export const InputAvatar = () => {
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [ava, setAva] = useState(noAva)

  const avatar = useAppSelector(avatarData)
  const { updateProfileTC } = useActions(profileThunks)

  useEffect(() => {
    if (avatar) {
      setAva(avatar)
      setIsAvaBroken(false)
    }
  }, [avatar])

  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          updateProfileTC({ avatar: file64 })
        })
      } else {
        console.error('Error: ', 'The file is too large')
      }
    }
  }

  return (
    <>
      <div className={s.profileImgWrap}>
        <img
          className={s.profileImg}
          src={isAvaBroken ? noAva : ava}
          onError={errorHandler}
          alt="User image"
        />
      </div>
      <IconButton className={s.butLabel} component="label" sx={{ ...ProfileChangeAvaButton }}>
        <input
          type="file"
          onChange={uploadHandler}
          style={{ display: 'none' }}
          accept={'image/*'}
        />
        <img className={s.profileImg} src={camera} alt="camera" />
      </IconButton>
    </>
  )
}
