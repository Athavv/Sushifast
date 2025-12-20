import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import "../styles/sidebar.css";

function Sidebar({ menus = [], onChange }) {
  const [search, setSearch] = useState("");
  const [saveurs, setSaveurs] = useState([]);
  const [noCalifornia, setNoCalifornia] = useState(false);
  const [piecesFilter, setPiecesFilter] = useState("all");
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [extreme, setExtreme] = useState("none");
  const [expandedSections, setExpandedSections] = useState({
    saveurs: true,
    prix: true,
    pieces: true,
    recherche: true,
    plusDemandes: true,
  });

  const uniqueSaveurs = useMemo(() => {
    const s = new Set();
    menus.forEach((m) => m.saveurs && m.saveurs.forEach((sv) => s.add(sv)));
    return Array.from(s).sort();
  }, [menus]);

  const uniquePieces = useMemo(() => {
    const p = new Set();
    menus.forEach((m) => p.add(m.pieces));
    return Array.from(p).sort((a, b) => a - b);
  }, [menus]);

  const totalPriceLt13 = useMemo(() => {
    return menus
      .filter((m) => m.pieces < 13)
      .reduce((total, m) => total + (m.prix || 0), 0);
  }, [menus]);

  const emitChange = (payload) => {
    onChange &&
      onChange({
        search,
        saveurs,
        noCalifornia,
        piecesFilter,
        selectedPieces,
        extreme,
        ...payload,
      });
  };

  function toggleSaveur(s) {
    const next = saveurs.includes(s) ? saveurs.filter((x) => x !== s) : [...saveurs, s];
    setSaveurs(next);
    emitChange({ saveurs: next });
  }

  function onSearchChange(v) {
    setSearch(v);
    emitChange({ search: v });
  }

  function onToggleNoCalifornia() {
    const next = !noCalifornia;
    setNoCalifornia(next);
    emitChange({ noCalifornia: next });
  }

  function toggleExtreme(type) {
    const next = extreme === type ? "none" : type;
    setExtreme(next);
    emitChange({ extreme: next });
  }

  function togglePiecesFilter() {
    const next = piecesFilter === "lt13" ? "all" : "lt13";
    setPiecesFilter(next);
    emitChange({ piecesFilter: next });
  }

  function togglePieceSize(size) {
    const exists = selectedPieces.includes(size);
    const next = exists ? selectedPieces.filter((p) => p !== size) : [...selectedPieces, size];
    setSelectedPieces(next);
    if (next.length > 0 && piecesFilter === "lt13") {
      setPiecesFilter("all");
      emitChange({ selectedPieces: next, piecesFilter: "all" });
    } else {
      emitChange({ selectedPieces: next });
    }
  }

  function resetAll() {
    setSearch("");
    setSaveurs([]);
    setNoCalifornia(false);
    setPiecesFilter("all");
    setSelectedPieces([]);
    setExtreme("none");
    emitChange({
      search: "",
      saveurs: [],
      noCalifornia: false,
      piecesFilter: "all",
      selectedPieces: [],
      extreme: "none",
    });
  }

  function toggleSection(section) {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function clearSaveurs() {
    setSaveurs([]);
    emitChange({ saveurs: [] });
  }

  function clearPieces() {
    setSelectedPieces([]);
    emitChange({ selectedPieces: [] });
  }

  function clearPrix() {
    setExtreme("none");
    emitChange({ extreme: "none" });
  }

  return (
    <aside className="sushi-sidebar">
      <div className="sidebar-header">
        <h5 className="sidebar-title">FILTRER PAR</h5>
        <button type="button" className="sidebar-clear-all" onClick={resetAll}>
          Tout Effacer
        </button>
      </div>

      {/* Section Recherche */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("recherche")}>
          <span className="filter-section-title">RECHERCHE</span>
          <span className={`filter-arrow ${expandedSections.recherche ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.recherche && (
          <div className="filter-section-content">
            <input
              type="search"
              className="form-control sidebar-search"
              placeholder="Rechercher un menu..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Section Saveurs */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("saveurs")}>
          <span className="filter-section-title">SAVEURS</span>
          <span className={`filter-arrow ${expandedSections.saveurs ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.saveurs && (
          <div className="filter-section-content">
            <div className="filter-checkboxes">
              {uniqueSaveurs.map((s) => (
                <div key={s} className="filter-checkbox-item">
                  <input
                    type="checkbox"
                    id={`saveur-${s}`}
                    checked={saveurs.includes(s)}
                    onChange={() => toggleSaveur(s)}
                    className="filter-checkbox"
                  />
                  <label htmlFor={`saveur-${s}`} className="filter-checkbox-label">
                    {s}
                  </label>
                </div>
              ))}
            </div>
            {saveurs.length > 0 && (
              <button type="button" className="filter-clear-link" onClick={clearSaveurs}>
                Effacer
              </button>
            )}
          </div>
        )}
      </div>


      {/* Section Prix */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("prix")}>
          <span className="filter-section-title">PRIX</span>
          <span className={`filter-arrow ${expandedSections.prix ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.prix && (
          <div className="filter-section-content">
            <div className="filter-checkboxes">
              <div className="filter-checkbox-item">
                <input
                  type="checkbox"
                  id="prix-max"
                  checked={extreme === "max"}
                  onChange={() => toggleExtreme("max")}
                  className="filter-checkbox"
                />
                <label htmlFor="prix-max" className="filter-checkbox-label">
                  Plus cher
                </label>
              </div>
              <div className="filter-checkbox-item">
                <input
                  type="checkbox"
                  id="prix-min"
                  checked={extreme === "min"}
                  onChange={() => toggleExtreme("min")}
                  className="filter-checkbox"
                />
                <label htmlFor="prix-min" className="filter-checkbox-label">
                  Moins cher
                </label>
              </div>
            </div>
            {extreme !== "none" && (
              <button type="button" className="filter-clear-link" onClick={clearPrix}>
                Effacer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Section Tailles */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("pieces")}>
          <span className="filter-section-title">TAILLES (PIÈCES)</span>
          <span className={`filter-arrow ${expandedSections.pieces ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.pieces && (
          <div className="filter-section-content">
            <div className="filter-checkboxes filter-pieces-list">
              {uniquePieces.map((p) => (
                <div key={p} className="filter-checkbox-item">
                  <input
                    type="checkbox"
                    id={`piece-${p}`}
                    checked={selectedPieces.includes(p)}
                    onChange={() => togglePieceSize(p)}
                    className="filter-checkbox"
                  />
                  <label htmlFor={`piece-${p}`} className="filter-checkbox-label">
                    {p} pièces
                  </label>
                </div>
              ))}
            </div>
            {selectedPieces.length > 0 && (
              <button type="button" className="filter-clear-link" onClick={clearPieces}>
                Effacer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Section Les plus demandés */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("plusDemandes")}>
          <span className="filter-section-title">LES PLUS DEMANDÉS</span>
          <span className={`filter-arrow ${expandedSections.plusDemandes ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.plusDemandes && (
          <div className="filter-section-content">
            <div className="filter-checkboxes">
              <div className="filter-checkbox-item">
                <input
                  className="filter-checkbox"
                  type="checkbox"
                  id="lt13"
                  checked={piecesFilter === "lt13"}
                  onChange={togglePiecesFilter}
                />
                <label className="filter-checkbox-label" htmlFor="lt13">
                  Moins de 13 pièces
                </label>
              </div>
              <div className="filter-checkbox-item">
                <input
                  className="filter-checkbox"
                  type="checkbox"
                  id="no-california"
                  checked={noCalifornia}
                  onChange={onToggleNoCalifornia}
                />
                <label className="filter-checkbox-label" htmlFor="no-california">
                  Sans "California Saumon Avocat"
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  menus: PropTypes.array,
  onChange: PropTypes.func,
};

export default Sidebar;
