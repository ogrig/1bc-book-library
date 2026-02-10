import type { Book } from "../components/components.types";

/** From env; set VITE_API_KEY and VITE_API_URL (e.g. in .env). Required in production. */
const API_KEY: string = import.meta.env.VITE_API_KEY ?? '';
const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:5250/Books';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY
});

export const fetchBooks = async (): Promise<Book[]> => {
  const requestOptions = {
    method: 'GET',
    headers: getHeaders()
  };

  const response = await fetch(API_URL, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const addBook = async (book: Book): Promise<void> => {
  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(book)
  };

  const response = await fetch(API_URL, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const updateBook = async (book: Book): Promise<void> => {
  const requestOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(book)
  };

  const response = await fetch(`${API_URL}/${book.id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const deleteBook = async (book: Book): Promise<void> => {
  const requestOptions = {
    method: 'DELETE',
    headers: getHeaders(),
    body: JSON.stringify(book)
  };

  const response = await fetch(`${API_URL}/${book.id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
