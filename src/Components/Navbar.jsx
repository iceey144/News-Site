import { Link } from "react-router-dom";

export default function Navbar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <nav>
      <h1>News Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Search News..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </nav>
  );
}


const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#333", color: "white", position: "sticky", top: 0 },
  title: { margin: 0 },
  links: { display: "flex", gap: "15px" },
  search: { marginRight: "5px" }
};
