import * as React from 'react'
import { createRoot } from 'react-dom/client'

import Main from './Main'

const domRoot = document.querySelector('#root')

createRoot(domRoot as Element).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
