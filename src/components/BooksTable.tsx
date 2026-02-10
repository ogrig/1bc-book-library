import { useContext, type JSX } from 'react';
import { UserContext } from '../contexts/UserContext';
import type { Book } from './components.types';

export interface BooksTableProps {
    currentBooks: Book[];
    handleBookAvailability: (id: number|undefined, borrow: boolean) => void;
    handleDelete: (id: number|undefined) => void;
}

const BooksTable = ({currentBooks, handleBookAvailability, handleDelete}: BooksTableProps): JSX.Element => {
    const currentUser = useContext(UserContext);

    const canReturnBook = (book: Book): boolean => {
        return book.borrower !== '' &&
            (book.borrower === currentUser || book.owner === currentUser);
    }

    const canDeleteBook = (book: Book): boolean => {
        return book.owner === currentUser;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-indigo-600 text-white">
                <tr>
                <th className="px-6 py-4 text-left font-semibold">Book</th>
                <th className="px-6 py-4 text-left font-semibold">Owner</th>
                <th className="px-6 py-4 text-left font-semibold">Availability</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {currentBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                    <div>
                        <div className="font-semibold text-gray-800">{book.title}</div>
                        <div className="text-sm text-gray-600">by {book.author}</div>
                        <div className="text-xs text-gray-500 mt-1">
                        ISBN: {book.isbn} | Published: {book.publishedDate}
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                    {book.owner || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        {book.borrower === '' ? (
                        <>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Available
                            </span>
                            <button
                            onClick={() => handleBookAvailability(book.id, true)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition"
                            >
                            Borrow
                            </button>
                        </>
                        ) : (
                        <>
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            Borrowed by {book.borrower}
                            </span>
                            <button
                            onClick={() => handleBookAvailability(book.id, false)}
                            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={!canReturnBook(book)}
                            >
                            Return
                            </button>
                        </>
                        )}
                        <button
                        onClick={() => handleDelete(book.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!canDeleteBook(book)}
                        >
                        Delete
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default BooksTable;