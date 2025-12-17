
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Accueil from "./pages/accueil";
import MenuDetail from "./pages/MenuDetail";

function App() {
  return (
    <Router>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/menu/:id" element={<MenuDetail />} />
          </Routes>
        </main>

        <Footer />
    </Router>
  );
}

export default App;
