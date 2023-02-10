import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SingleArticlePage } from './components/single/SingleArticlePage';
import { ArticlesListPage } from './components/ArticlesListPage';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/articles" element={<ArticlesListPage />}></Route>
          <Route path="/articles/:article_id" element={<SingleArticlePage/>}></Route>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  )
}

export default App;
