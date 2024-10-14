import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Бизнес хайх..."
        className="flex-grow px-4 py-3 border-2 border-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="zoon-button px-6 py-3 rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;