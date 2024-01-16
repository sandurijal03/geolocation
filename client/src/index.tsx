import * as React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'

import Main from './Main'
import { Provider } from 'react-redux'
import store from './store/store'

const domRoot = document.querySelector('#root')

// createRoot(domRoot as Element).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Main />
//     </Provider>
//   </React.StrictMode>,
// )

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  domRoot,
)
