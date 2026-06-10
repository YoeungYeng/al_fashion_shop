import { createContext, useContext, useState } from "react";

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  committedQuery: string;
  commitQuery: () => void;
  clearQuery: () => void;
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [committedQuery, setCommittedQuery] = useState("");

  const commitQuery = () => setCommittedQuery(query);
  const clearQuery = () => { setQuery(""); setCommittedQuery(""); };

  return (
    <SearchContext.Provider value={{ query, setQuery, committedQuery, commitQuery, clearQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);