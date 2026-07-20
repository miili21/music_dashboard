import { Search, Menu, X } from "lucide-react";
interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function SearchBar({ onSearch, searchQuery }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto z-20 relative">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 glass-panel shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition duration-300">
        <button className="text-neutral-400 hover:text-white transition focus:outline-none" id="search-bar-menu">
          <Menu className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Hinted search text"
          className="flex-1 bg-transparent border-none outline-none text-white text-sm font-sans tracking-wide"
          id="search-bar-input"
        />

        {searchQuery && (
          <button 
            onClick={() => onSearch("")} 
            className="text-neutral-500 hover:text-white transition focus:outline-none"
            id="search-bar-clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="text-neutral-400">
          <Search className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
