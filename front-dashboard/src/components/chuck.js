import { useState, useEffect } from 'react';
const axios = require('axios');

function Quote() {
  const [quote, setQuote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  async function fetchQuote() {
    let url = 'http://localhost:3005/api/quote';

    if (selectedCategory) {
      url += `/${selectedCategory}`;
    }

    try {
      const response = await axios.get(url);
      const { value } = response.data;
      setQuote(value);
    } catch (error) {
      console.error(error);
      setQuote(`Error retrieving quote`)
    }

  }
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }


  return (
    <div className='w-4/12 rounded-lg p-2 m-3 min-w-[360px]  border-double

    border border-sky-500  overflow-auto max-h-[38rem]	' >
      <div className="hero-content flex-col lg:flex-row">
        <img src="https://pbs.twimg.com/media/E2fAEE9VIAUL3tR.jpg" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Quote of the day</h1>
          <p className="py-6">{quote}</p>
          <button onClick={fetchQuote} className="btn btn-primary">Refresh</button>
        </div>
        <select value={selectedCategory} onChange={handleCategoryChange} className="select select-primary w-full max-w-xs">
          <option disabled selected>Choose by category</option>
          <option>animal</option>
          <option>career</option>
          <option>celebrity</option>
          <option>explicit</option>
          <option>fashion</option>
          <option>food</option>
          <option>history</option>
          <option>money</option>
          <option>movie</option>
          <option>music</option>
          <option>political</option>
          <option>religion</option>
          <option>science</option>
          <option>sport</option>
          <option>travel</option>
        </select>
      </div>
    </div>
   
  )
};

export { Quote };

