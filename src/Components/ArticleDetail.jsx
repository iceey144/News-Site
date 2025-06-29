import { useState } from "react";

export default function ArticleDetail({ article }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!article) return <div className="detail-panel">Select an article to see details</div>;

  const summarize = async () => {
    setLoading(true);
    setSummary(null);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Summarize the following article in 3 bullet points:\n\n${article.content || article.description || article.title}`
                  }
                ]
              }
            ]
          })
        }
      );
      const data = await res.json();
      const bullets = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setSummary(bullets || "No summary available.");
    } catch (err) {
      setSummary("Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detail-panel">
      <h2>{article.title}</h2>
      <img src={article.urlToImage} alt="full" />
      <p><b>Author:</b> {article.author || "Unknown"}</p>
      <p><b>Source:</b> {article.source.name}</p>
      <p><b>Published:</b> {new Date(article.publishedAt).toLocaleString()}</p>
      <a href={article.url} target="_blank" rel="noreferrer">Read Full Article</a>

      <div style={{ marginTop: "15px" }}>
        <button onClick={summarize} disabled={loading}>
          {loading ? "Summarizing..." : "Summarize"}
        </button>
        {summary && (
          <div style={{ marginTop: "15px" }}>
            <h4>Summary:</h4>
            <pre>{summary}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
