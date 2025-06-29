export default function Tabs({ categories, active, setActive }) {
  return (
    <div style={{ display: "flex", gap: "10px", margin: "10px 0"}}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          style={active === cat ? activeStyle : buttonStyle}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}



const buttonStyle = { padding: "5px 10px", background: "#eee", border: "1px solid #ccc", background : " #333", color:"white", margin:"5px"};
const activeStyle = { padding: "5px 10px", background: "#007BFF", color: "white", border: "none",  margin:"5px"};
