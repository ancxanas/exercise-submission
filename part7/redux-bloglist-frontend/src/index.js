import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'

let theme = createTheme({
  palette: {
    primary: {
      main: '#212427',
    },
    secondary: {
      main: '#FFFFF',
    },
    background: '#45A29E',
  },
  typography: {
    fontFamily: 'monospace',
    h2: {
      fontFamily: 'monospace',
      fontSize: 25,
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: 'monospace',
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

theme = responsiveFontSizes(theme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </Router>
)
