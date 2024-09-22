import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './Theme.ts'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline></CssBaseline>
    <ThemeProvider theme={theme}>
      <App />
    </ ThemeProvider>
  </React.StrictMode>,
)
