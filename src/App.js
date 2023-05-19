import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SingleArticlePage } from "pages/SingleArticlePage";
import { ArticlesListPage } from "pages/ArticlesListPage";
import { LoginPage } from "pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderItem } from "components/header/HeaderItem";
import { ErrorPage } from "pages/ErrorPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderItem />
        <Routes>
          <Route path="/articles" element={<ArticlesListPage />}></Route>
          <Route
            path="/articles/:article_id"
            element={<SingleArticlePage />}
          ></Route>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
