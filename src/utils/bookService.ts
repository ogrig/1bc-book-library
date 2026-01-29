import type { Book } from "../components/components.types";

const API_KEY: string = '12345678-ABCD-4EFG-9012-HIJK345678LM';
// const API_URL_HTTPS: string = 'https://localhost:7180/Books';
const API_URL: string = 'http://localhost:5250/Books';

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
      
    } catch (error: any) {
      setError(error);
      
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
      setError(err.message);
      
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
      setError(err.message);
      
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
      setError(err.message);
      
    } finally {
      setIsLoading(false);
    }
};

