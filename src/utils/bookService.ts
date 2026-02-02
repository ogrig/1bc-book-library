import type { Book } from "../components/components.types";

/** From env; set VITE_API_KEY and VITE_API_URL (e.g. in .env). Required in production. */
const API_KEY: string = import.meta.env.VITE_API_KEY ?? '';
const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:5250/Books';

export const fetchBooks = async (setError: (value: React.SetStateAction<string|null>) => void,
        setIsLoading: (value: React.SetStateAction<boolean>) => void,
        setBooks: (value: React.SetStateAction<Book[]>) => void) => {

    const requestOptions = {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "mode": "no-cors",
                'X-API-Key': API_KEY
            }
    };

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBooks(data);
      
    } catch (err: any) {
      setError(err instanceof Error ? err.message : String(err));
      
    } finally {
      setIsLoading(false);
    }
  };


export const addBook = async (book: Book,
    setError: (value: React.SetStateAction<string|null>) => void,
    setIsLoading: (value: React.SetStateAction<boolean>) => void) => {
    const requestOptions = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "mode": "no-cors",
                'X-API-Key': API_KEY
            },
        body: JSON.stringify(book)
    };

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err: any) {
      setError(err instanceof Error ? err.message : String(err));
      
    } finally {
      setIsLoading(false);
    }
}

export const updateBook = async (book: Book,
    setError: (value: React.SetStateAction<string|null>) => void,
    setIsLoading: (value: React.SetStateAction<boolean>) => void) => { 

    const requestOptions = {
        method: 'PUT',
        headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
            },
        body: JSON.stringify(book)
    };

    setIsLoading(true);
    try {
      const response = await fetch(API_URL + '/' + book.id, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err: any) {
      setError(err instanceof Error ? err.message : String(err));
      
    } finally {
      setIsLoading(false);
    }
  };

export const deleteBook = async (book: Book,
    setError: (value: React.SetStateAction<string|null>) => void,
    setIsLoading: (value: React.SetStateAction<boolean>) => void) => { 

    const requestOptions = {
        method: 'DELETE',
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "mode": "no-cors",
                'X-API-Key': API_KEY
            },
        body: JSON.stringify(book)
    };

    setIsLoading(true);
    try {
      const response = await fetch(API_URL + '/' + book.id, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err: any) {
      setError(err instanceof Error ? err.message : String(err));
      
    } finally {
      setIsLoading(false);
    }
};

