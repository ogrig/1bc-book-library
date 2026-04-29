import { useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import { Plus, BookOpen } from 'lucide-react';
import SearchBar from './components/SearchBar';
import BooksTable from './components/BooksTable';
import type { Book } from './components/components.types';
import ErrorBox from './components/ErrorBox';
import AddBookModal from './components/AddBookModal';
import { addBook, deleteBook, fetchBooks, updateBook } from './utils/bookService';
import ConfirmDialogModal from './components/ConfirmDialogModal';
import NavBar from './components/NavBar';

// we need a way to identify the current user... API, SSO, etc.
const currentUser: string = 'John Smith';
const emptyBookList: Book[] = [];
const emptyBook: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
    owner: currentUser,
    borrower: '',
    version: 1
  };

const BookLibrary = () => {
  const [books, setBooks] = useState(emptyBookList);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | undefined>(undefined);
  const booksPerPage = 4;

  // New book form state
  const [newBook, setNewBook] = useState(emptyBook);

  const loadBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch books from API
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadBooks();
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const refreshBooks = (filter: string) => {
    setSearchTerm(filter);
    setCurrentPage(1);
  };

  // Filter books based on search
  const filteredBooks = books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  // Pagination
  const calculatePagination = () => {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    return { totalPages, currentBooks };
  }

  let { totalPages, currentBooks } = calculatePagination();

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleBookAvailability = async (id: number | undefined, borrow: boolean) => {
    const currentBook = books.find(book => book.id === id);
    if (!currentBook) {
      setError('Book not found');
      return;
    }

    const updatedBook: Book = {
      ...currentBook,
      borrower: borrow ? currentUser : '',
    };
    
    setIsLoading(true);
    try {
      await updateBook(updatedBook);
      await loadBooks();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number | undefined) => {
    setConfirmDeleteId(id);
  };

  const handleAddBook = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const book: Book = {
      ...newBook,
      id: Math.max(...books.map(b => b.id), 0) + 1,
      borrower: ''
    };

    setIsLoading(true);
    try {
      await addBook(book);
      setBooks([...books, book]);
      setNewBook(emptyBook);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const confirmDelete = async () => {
    if (confirmDeleteId !== undefined) {
      const currentBook = books.find(book => book.id === confirmDeleteId);
      if (!currentBook) {
        setError('Book not found');
        setConfirmDeleteId(undefined);
        return;
      }
      setIsLoading(true);
      try {
        await deleteBook(currentBook);
        setBooks(books.filter(book => book.id !== confirmDeleteId));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
        setConfirmDeleteId(undefined);
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Library</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="relative mb-4">
            <div className="flex justify-between items-center">
              {/* Search Box */}
              <SearchBar
                searchTerm={searchTerm}
                refreshBooks={refreshBooks}
              />
              {/* Navigatiob Buttons */}
              <NavBar
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error &&  <ErrorBox errorMessage={error} /> }

        {/* Books Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading books...</div>
          ) : currentBooks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No books found</div>
          ) : (
            <UserContext.Provider value={currentUser}>
              <BooksTable
                currentBooks={currentBooks}
                handleBookAvailability={handleBookAvailability}
                handleDelete={handleDelete}
              />
            </UserContext.Provider>
          )}
        </div>
        
        {/* Add Book Button */}
        <div
          className="fixed bottom-4 right-4 "
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5" />
            Add Book
          </button>
        </div>
      </div>

      {/* Add Book Modal */}
      {isModalOpen && (
        <AddBookModal
          setIsModalOpen = {setIsModalOpen}
          newBook = {newBook}
          setNewBook = {setNewBook} 
          handleAddBook = {handleAddBook}
        />
      )}

      {/* Add Book Modal */}
      {confirmDeleteId !== undefined && (
        <ConfirmDialogModal
          message="Are you sure you want to delete this book?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteId(undefined)}
        />
      )}
    </div>
  );
};

export default BookLibrary;