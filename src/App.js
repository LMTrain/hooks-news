import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setErroor] = useState(null);
  const searchInputRef = useRef();

  useEffect(
    () => {
      getResults(); 
    
  }, 
    []
  );

  const getResults = async () => {
    setLoading(true);

    try {

      const response = await axios.get(
        // `http://hn.algolia.com/api/v1/search?query=${query}`
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&orderBy=newest&key=AIzaSyD5c7Uuj4hd7FPRO9A9o4zhWaCTsffKrNc`
      );
      console.log(response)
      // setResults(response.data.hits);
      setResults(response.data.items);
    } catch (err) {
      setErroor(err)

    }
    setLoading(false);
    
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-light shadow-xlg rounded">
      <img src="https://lmtrain.github.io/lm-images/assets/images/ls_wf3.jpg" alt="Logo" className="float-right h-12" />
      <h1 className="text-white font-thin text-center">Hooks News</h1>

      <form onSubmit={handleSearch} className="mb-2">
      <input 
        type="text" 
        onChange={event => setQuery(event.target.value)}
        value={query}
        ref={searchInputRef}
        className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">Search</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal text-white p-1 rounded">Clear</button>
      </form>
      {loading ? (
        <div className="font-bold text-black-dark">Loading results...</div>
      ) : (
      <ul className="list-reset leading-normal">
        {results.map(result => (
          // <li key={result.objectID} className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
          //   <a href={result.url} className="text-indigo-dark hover:text-indigo-darkest">{result.title}</a>
          // </li>
          <li key={result.etag} className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
            <a href={result.volumeInfo.infoLink} className="text-indigo-dark hover:text-indigo-darkest">{result.volumeInfo.title}</a>
          </li>
        ))}
      </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}
      </div>}
    </div>
  );
  
}