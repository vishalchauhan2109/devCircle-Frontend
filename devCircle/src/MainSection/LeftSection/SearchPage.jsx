// src/SearchPage.jsx
import React, { useState } from 'react';



export default function SearchPage() {
  const [query, setQuery] = useState('');

  const handleInput = (e) => setQuery(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <div className="flex flex-col  h-130 text-white">

      {/* Add padding-top equal to navbar height (here h-16 = 4rem) */}
      <main className="flex-1 flex  justify-center pt-10 px-4">
        <form onSubmit={handleSearch} className= " plr-2 w-full max-w-md">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Type to search..."
              className="grow px-4 py-2 bg-neutral-700 text-white placeholder-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md text-white font-medium"
            >
              Search
            </button>
          </div>
        </form>
      </main>

      {/* optionally footer etc */}
    </div>
  );
}
