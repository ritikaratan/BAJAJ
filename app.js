import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    numbers: true,
    alphabets: true,
    highestAlphabet: true,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const result = await axios.post('http://localhost:19500/bfhl', parsedData);
      setResponse(result.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="App">
      <h1>API Data Processor</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={handleChange}
        placeholder='Enter JSON here (e.g., { "data": ["A", "C", "z"] })'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Response</h2>
          <label>
            <input
              type="checkbox"
              name="numbers"
              checked={selectedOptions.numbers}
              onChange={handleOptionChange}
            />
            Show Numbers
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="alphabets"
              checked={selectedOptions.alphabets}
              onChange={handleOptionChange}
            />
            Show Alphabets
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="highestAlphabet"
              checked={selectedOptions.highestAlphabet}
              onChange={handleOptionChange}
            />
            Show Highest Alphabet
          </label>
          <br />
          {selectedOptions.numbers && response.numbers && (
            <div>
              <h3>Numbers</h3>
              <ul>
                {response.numbers.map((num, index) => (
                  <li key={index}>{num}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedOptions.alphabets && response.alphabets && (
            <div>
              <h3>Alphabets</h3>
              <ul>
                {response.alphabets.map((alpha, index) => (
                  <li key={index}>{alpha}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedOptions.highestAlphabet && response.highest_alphabet && (
            <div>
              <h3>Highest Alphabet</h3>
              <ul>
                {response.highest_alphabet.map((alpha, index) => (
                  <li key={index}>{alpha}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
