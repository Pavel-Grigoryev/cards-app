import React from 'react'

import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

import { Header } from '../header/Header'

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Container
          style={{
            maxWidth: '1056px',
            paddingTop: '64px',
          }}
        >
          <Outlet />
        </Container>
      </main>
    </>
  )
}
