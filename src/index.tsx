import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
// eslint-disable-next-line import/order
import { ThemeProvider, createTheme } from '@mui/material/styles'

import App from './app/App'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#366eff',
    },
  },
})

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
