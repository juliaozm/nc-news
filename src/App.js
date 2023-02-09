import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SingleArticlePage } from './components/single/SingleArticlePage';
import { ArticlesListPage } from './components/ArticlesListPage';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<ArticlesListPage />}></Route>
          <Route path="/articles" element={<ArticlesListPage />}></Route>
          <Route path="/articles/:article_id" element={<SingleArticlePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
