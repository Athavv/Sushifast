import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import "../styles/sidebar.css";

function Sidebar({ menus = [], onChange }) {
  const [search, setSearch] = useState("");
  const [saveurs, setSaveurs] = useState([]);
  const [noCalifornia, setNoCalifornia] = useState(false);
  const [piecesFilter, setPiecesFilter] = useState("all"); // all | lt13
  const [selectedPieces, setSelectedPieces] = useState([]); // tableau de tailles choisies
  const [extreme, setExtreme] = useState("none"); // none | max | min

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
    // Si on choisit des tailles exactes, on force le filtre global sur "all" pour éviter le conflit visuel
    setPiecesFilter("all");
    emitChange({ selectedPieces: next, piecesFilter: "all" });
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

  return (
    <aside className="sushi-sidebar rounded">
      <h5 className="mb-3">Filtres</h5>

      <div className="mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Rechercher un menu..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <strong>Saveurs</strong>
        <div className="mt-2 d-flex flex-wrap gap-2">
          {uniqueSaveurs.map((s) => (
            <button
              key={s}
              type="button"
              className={`btn btn-sm ${saveurs.includes(s) ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => toggleSaveur(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" id="no-california" checked={noCalifornia} onChange={onToggleNoCalifornia} />
        <label className="form-check-label" htmlFor="no-california">Sans "California Saumon Avocat"</label>
      </div>

      <hr />

      <div className="mb-3">
        <strong>Prix</strong>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            className={`btn btn-sm rounded-pill cacaBtn ${extreme === "max" ? "btn-danger" : "btn-outline-danger bg-danger text-white"}`}
            onClick={() => toggleExtreme("max")}
          >
            Plus cher
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill cacaBtn ${extreme === "max" ? "btn-success" : "btn-outline-success bg-success text-white"}`}
            onClick={() => toggleExtreme("max")}
          >
            Moins cher
          </button>
        </div>
      </div>

      <div className="mb-3">
        <strong>Tailles (pièces)</strong>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {uniquePieces.map((p) => (
            <button
              key={p}
              type="button"
              className={`btn btn-sm ${selectedPieces.includes(p) ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => togglePieceSize(p)}
            >
              {p} pcs
            </button>
          ))}
        </div>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="lt13"
            checked={piecesFilter === "lt13"}
            onChange={togglePiecesFilter}
          />
          <label className="form-check-label" htmlFor="lt13">
            Moins de 13 pièces
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button type="button" className="btn btn-outline-secondary" onClick={resetAll}>
          Réinitialiser les filtres
        </button>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  menus: PropTypes.array,
  onChange: PropTypes.func,
};

export default Sidebar;
