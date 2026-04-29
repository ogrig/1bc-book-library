import { type JSX } from 'react';
import { Search } from 'lucide-react';

export interface SearchBarProps {
    searchTerm: string;
    refreshBooks: (filter: string) => void;
}

const SearchBar = ({searchTerm, refreshBooks}: SearchBarProps): JSX.Element => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filter = e.target.value;
        refreshBooks(filter);
    }

    return (
        <>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => handleOnChange(e)}
                className="w-1/3 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
        </>
  );
}

export default SearchBar;