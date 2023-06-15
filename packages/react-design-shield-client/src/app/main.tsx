import React from 'react'
import ReactDOM from 'react-dom/client'

import DesignShield from '~components/DesignShield'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DesignShield>
      <App />
    </DesignShield>
  </React.StrictMode>,
)
