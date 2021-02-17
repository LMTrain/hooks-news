import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import "./style.css";
import { Card, CardHeader, Row, Col} from 'reactstrap';

//Declare export function
export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('Bugatti');
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
    <>
      <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-xlg rounded border">
        <img src="https://lmtrain.github.io/lm-images/assets/images/bugatti_3.jpg" alt="Logo" width="100" height="130" className="float-right" />
        <h1 className="text-blue font-thin text-center">News-Books-Magazines</h1>

        <form onSubmit={handleSearch} className="mb-2">
        <input 
          type="text" 
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
          />
          <button type="submit" className="bg-orange shadow-lg rounded m-1 p-1">Search</button>
          <button type="button" onClick={handleClearSearch} className="bg-teal text-white p-1 shadow-lg rounded">Clear</button>
        </form>
      </div>

      <Row>
          {loading ? (
            <div className="font-bold text-black-dark">Loading results...</div>
          ) : (
   // Display a Row
        <div className="book-row-display">
          {/* <ul className="list-reset leading-normal"> */}
            {results.map(result => (
              // <li key={result.objectID} className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
              //   <a href={result.url} className="text-indigo-dark hover:text-indigo-darkest">{result.title}</a>
              // </li>
              
              <Col key={result.etag} md="3">
                <Card className="book-card">
                  <CardHeader className="card-header"><b>{result.volumeInfo.title}</b> </CardHeader>
                              
                  <div className="img-container">
                    <a href = {result.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">

                      <img
                        
                        alt={result.volumeInfo.title} width="130" height="230" 
                        src={result.volumeInfo.imageLinks == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : result.volumeInfo.imageLinks.thumbnail}                        
                          
                      />
                    </a>
                  </div>
                
                </Card>
              </Col>
              
              ))}
          {/* </ul> */}
          </div>
          )}
        </Row>

          {error && <div className="text-red font-bold">{error.message}
          </div>}
   
      
    </>
 
  );
  
}