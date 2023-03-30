import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SingleArticlePage } from "./components/single/SingleArticlePage";
import { ArticlesListPage } from "./components/articles/ArticlesListPage";
import { LoginPage } from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderComponent } from "./components/header/HeaderComponent";
import { ErrorComponent } from "./components/ErrorComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/articles" element={<ArticlesListPage />}></Route>
          <Route
            path="/articles/:article_id"
            element={<SingleArticlePage />}
          ></Route>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<ErrorComponent />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
