export default function ArticleCard({ article, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={article.urlToImage} alt="thumbnail" />
      <div className="card-content">
        <h3>{article.title}</h3>
        <p><b>Source:</b> {article.source.name}</p>
      </div>
    </div>
  );
}
