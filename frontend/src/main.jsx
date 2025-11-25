import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SnippetViewPage from './components/SnippetViewPage/SnippetViewPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <SnippetViewPage />
  </StrictMode>,
)
