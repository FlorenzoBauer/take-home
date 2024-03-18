import { useEffect, useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';

const Home = ({ articles, setArticles }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleDetailView = (article) => {
    setArticles([article]);
    navigate('/article');
  };

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        return res.json();
      })
      .then(data => setArticles(data.articles))
      .catch(error => {
        setError(error.message);
        console.error(error);
      });
  }, []);

  const renderCards = () => {
    if (error) {
      return <div className="error">{error}</div>;
    } else if (articles.length === 0) {
      return <div className="no-news">No news found</div>;
    } else {
      return articles.map((article, index) => (
        <article key={index} className='article' onClick={() => handleDetailView(article)}>
          <figure>
            <img src={article.urlToImage} alt={article.title} className='article-image' />
            <figcaption>
              <h2 className='article-title'>{article.title}</h2>
              <p className='article-description'>{article.description}</p>
              <button className='article-link'>Detailed View</button>
            </figcaption>
          </figure>
        </article>
      ));
    }
  };

  return (
    <section className='home'>
      {renderCards()}
    </section>
  );
};

export default Home;
