import './Search.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Search = ({ setArticles }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    month = month < 10 ? '0' + month : month;
    let day = currentDate.getDate();
    day = day < 10 ? '0' + day : day; 
    return `${year}-${month}-${day}`;
  };

  const searchNewsArticle = () => {
    if (search.trim() !== '') {
      const currentDate = getCurrentDate();
      fetch(`https://newsapi.org/v2/everything?q=${search}&from=${currentDate}&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setArticles(data.articles);
          setError('');
        })
        .catch(error => {
          setError('An error occurred. Please try again later.');
        });
    } else {
      setError('Search query cannot be empty!');
      navigate('/article');

    }
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    searchNewsArticle();
  };

  return (
    <section className='search-section'>
      <form>
        <input type='text' placeholder='Search News' value={search} onChange={event => setSearch(event.target.value)} />
        <button className='search-btn' onClick={handleSearchClick}>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default Search;
