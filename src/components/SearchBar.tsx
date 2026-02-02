import { type JSX } from 'react';
import { Search } from 'lucide-react';

export interface SearchBarProps {
    searchTerm: string;
    refreshBooks: (filter: string) => void;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
    totalPages: number;
}

const SearchBar = ({searchTerm, refreshBooks, handlePrevPage, handleNextPage, currentPage, totalPages}: SearchBarProps): JSX.Element => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filter = e.target.value;
        refreshBooks(filter);
    }

    return (
        <div className="relative mb-4">
            <div className="flex justify-between items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => handleOnChange(e)}
                    className="w-1/3 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                    <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
                    >
                    Previous
                    </button>
                    <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
                    >
                    Next
                    </button>
                    <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                    Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
                    </span>
                </div>
            </div>
        </div>
  );
}

export default SearchBar;