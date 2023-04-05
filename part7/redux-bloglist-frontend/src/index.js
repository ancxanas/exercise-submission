import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#66FCF1',
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </Router>
)
