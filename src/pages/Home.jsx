import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Tabs from "../Components/Tabs";
import ArticleCard from "../Components/ArticleCard";
import ArticleDetail from "../Components/ArticleDetail";
import axios from "axios";

export default function Home() {
  const categories = ["Business", "Technology", "Sports", "Health"];
  const [activeCat, setActiveCat] = useState("Business");
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNews();
  }, [activeCat]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${activeCat.toLowerCase()}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      setArticles(res.data.articles);
    } catch (err) {
      console.error(err);
    }
  };

  const searchNews = async () => {
    if (!searchTerm.trim()) return;

    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      setArticles(res.data.articles);
      setSelected(null); // Clear previous selection
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={searchNews} />
      <Tabs categories={categories} active={activeCat} setActive={setActiveCat} />
      <div className="main-container">
        <div className="grid-container">
          {articles.map((art, idx) => (
            <ArticleCard key={idx} article={art} onClick={() => setSelected(art)} />
          ))}
        </div>
        <div className="detail-section">
          <ArticleDetail article={selected} />
        </div>
      </div>
    </div>
  );
}
