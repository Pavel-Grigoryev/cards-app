import React from 'react'

import { Link } from 'react-router-dom'

import backArrow from '../../../assets/images/backArrow.svg'

import s from './ReturnLink.module.scss'

export const ReturnLink = ({ path, title }: ReturnLinkPropsType) => {
  return (
    <div className={s.returnLink}>
      <Link to={path}>
        <img src={backArrow} alt="" />
        <span className={s.title}>{title}</span>
      </Link>
    </div>
  )
}

//Types

type ReturnLinkPropsType = {
  path: string
  title: string
}
