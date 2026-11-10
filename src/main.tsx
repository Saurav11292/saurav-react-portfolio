import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const stylesheet = document.createElement('link')
stylesheet.rel = 'stylesheet'
stylesheet.href = new URL('./styles.css', import.meta.url).href
document.head.append(stylesheet)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
