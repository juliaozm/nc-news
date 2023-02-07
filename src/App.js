import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SingleArticlePage } from './components/single/SingleArticlePage';
import { ArticlesListPage } from './components/ArticlesListPage.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArticlesListPage />}></Route>
          <Route path="/articles" element={<ArticlesListPage />}></Route>
          <Route path="/articles/:article_id" element={<SingleArticlePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
