import { createContext } from 'react';

// UserContext holds the current user's name. Default is an empty string.
export const UserContext = createContext<string>('');
