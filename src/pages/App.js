import "assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArticlePage } from "pages/article/ArticlePage";
import { ArticlesListPage } from "pages/articlesList/ArticlesListPage";
import { AuthPage } from "pages/auth/AuthPage";
import { ErrorPage } from "pages/error/ErrorPage";
import { Header } from "components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/articles" element={<ArticlesListPage />}></Route>
          <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
          <Route path="/" element={<AuthPage />}></Route>
          <Route path="/login" element={<AuthPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
