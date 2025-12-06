import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PageRoutes } from './routes.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
// import App from './App.jsx'
// import SnippetViewPage from './components/SnippetViewPage/SnippetViewPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> {/*layout*/}
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  </StrictMode>,
)
