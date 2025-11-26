import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Accueil from "./pages/accueil";
import MenusFiltres from "./pages/menusFiltres";
import PricedMenus from "./pages/pricedMenus";

function App() {
  return (
    <Router>
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/menus-filtres" element={<MenusFiltres />} />
            <Route path="/priced-menus" element={<PricedMenus />} />

          </Routes>
        </main>

        <Footer />
    </Router>
  );
}

export default App;
