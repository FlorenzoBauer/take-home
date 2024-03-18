import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// @ts-ignore
import Header from '../Header/Header'
// @ts-ignore
import Search from '../Search/Search';
import Home from '../Home/Home'
import mockData from '../../mockData';
// @ts-ignore
import DetailedV from '../DetailedV/DetailedV'

function App() { 
  const [articles, setArticles] = useState(mockData.articles)


  return (
    <main>
      <Header />
      <Search setArticles={setArticles}/>
      <Routes>
        <Route path='/' element={<Home articles={articles} setArticles={setArticles}/>} />
        <Route path='/article' element={<DetailedV articles={articles}/>} />
      </Routes>
    </main>
  )
}

export default App;
