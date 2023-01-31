import React from 'react'

import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header/Header'

import s from './Layout.module.scss'

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Container className={s.container}>
          <Outlet />
        </Container>
      </main>
    </>
  )
}
