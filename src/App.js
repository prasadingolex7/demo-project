import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [catData, setCatData] = useState({ fact: '' });
  const [savedFacts, setSavedFacts] = useState([]);

  useEffect(() => {
    // Load saved facts from local storage on component mount
    const savedFactsFromLocalStorage = JSON.parse(localStorage.getItem('savedFacts')) || [];
    setSavedFacts(savedFactsFromLocalStorage);
  }, []);

  const fetchRandomCatData = async () => {
    try {
      // Fetch a random cat fact
      const factResponse = await fetch('https://catfact.ninja/fact');
      if (!factResponse.ok) {
        throw new Error('Failed to fetch cat fact');
      }
      const factData = await factResponse.json();

      setCatData({
        fact: factData.fact,
      });
    } catch (error) {
      console.error('Error fetching cat data:', error.message);
    }
  };

  const saveCatFact = () => {
    // Save the current cat fact to local storage
    const updatedSavedFacts = [...savedFacts, catData.fact];
    setSavedFacts(updatedSavedFacts);
    localStorage.setItem('savedFacts', JSON.stringify(updatedSavedFacts));
  };

  const clearAllSavedFacts = () => {
    // Clear all saved facts from local storage
    setSavedFacts([]);
    localStorage.removeItem('savedFacts');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Cat Facts App</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Random Cat Fact:</h2>
              <p className="card-text">{catData.fact}</p>
              <button className="btn btn-primary mr-5" style={{'margin-right': '5px'}} onClick={fetchRandomCatData}>
                Load New Fact
              </button>
              <button className="btn btn-success" onClick={saveCatFact}>
                Save Cat Fact
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Saved Cat Facts:</h2>
              <ul className="list-group">
                {savedFacts.map((fact, index) => (
                  <li key={index} className="list-group-item">
                    {fact}
                  </li>
                ))}
              </ul>
              {savedFacts.length > 0 && (
                <button className="btn btn-danger mt-3" onClick={clearAllSavedFacts}>
                  Clear All Saved Facts
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
