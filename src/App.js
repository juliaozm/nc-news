import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticlesListPage } from './components/ArticlesListPage.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ArticlesListPage />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
