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
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#001D3D] text-white">

      {/* Main content */}
      <main className="flex-1 flex justify-center items-start pt-16 px-4">
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="flex shadow-lg rounded-md overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Type to search..."
              className="grow px-4 py-3 bg-[#003566] text-[#FFD60A] placeholder-[#FFC300] focus:outline-none focus:ring-2 focus:ring-[#FFC300] transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#FFC300] to-[#FFD60A] text-[#001D3D] font-semibold hover:opacity-90 transition"
            >
              Search
            </button>
          </div>
        </form>
      </main>

      {/* Optional footer */}
      <footer className="mt-auto py-4 text-center text-[#FFD60A] opacity-80">
        DevCircle Search
      </footer>
    </div>
  );
}
