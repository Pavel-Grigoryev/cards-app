import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'
import {
  LinkWithImage,
  LinkWithImagePropsType,
} from '../../../common/components/LinkWithImage/LinkWithImage'
import { logoutTC } from '../../auth/auth-reducer'

import s from './ProfileLink.module.scss'

import logoutImg from 'assets/images/logout.svg'
import userImg from 'assets/images/user.svg'
import { PATH } from 'common/routes/routes'

export const ProfileLink = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const profileLinks: LinkWithImagePropsType[] = [
    {
      id: '1',
      img: userImg,
      title: 'Profile',
      callback: () => {
        navigate(PATH.PROFILE)
      },
    },
    {
      id: '2',
      img: logoutImg,
      title: 'Log out',
      callback: () => {
        dispatch(logoutTC())
      },
    },
  ]

  const links = profileLinks.map(link => <LinkWithImage key={link.id} {...link} />)

  return <ul className={s.profileLinks}>{links}</ul>
}
