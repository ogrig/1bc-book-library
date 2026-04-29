import { type JSX } from 'react';

export interface NavBarProps {
    handlePrevPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
    totalPages: number;
}

const NavBar = ({handlePrevPage, handleNextPage, currentPage, totalPages}: NavBarProps): JSX.Element => {
    return (
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
  );
}

export default NavBar;
