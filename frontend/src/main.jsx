import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'     // ✅ Import Provider
import { store } from './redux/store.js'   // ✅ Import store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>               {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
)
