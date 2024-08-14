import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import {SocketProvider} from './Context/socketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persistor}>
  <SocketProvider>
    <App />
    <Toaster closeButton/>
  </SocketProvider>
      
      </PersistGate>
    </Provider>
  </>
)
