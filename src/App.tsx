import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import { BooksContextProvider } from "./utils/BooksContext";

function App() {
  return (
    <div className="app">
      <BooksContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BooksContextProvider>
    </div>
  );
}

export default App;
