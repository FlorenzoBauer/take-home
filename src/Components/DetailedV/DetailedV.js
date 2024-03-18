import { useNavigate } from 'react-router-dom';
import './DetailedV.css';

const DetailedV = ({ articles }) => {
  const navigate = useNavigate();
  const article = articles[0];

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <section className='detailed-view'>
      <button onClick={handleNavigateHome} className="search-btn">Go Back</button>
      <h2>{article.title}</h2>
      <img src={article.urlToImage} alt={article.title} className='detailed-image' />
      <p>{article.description}</p>
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Link to Article</a>
    </section>
  );
};

export default DetailedV;
