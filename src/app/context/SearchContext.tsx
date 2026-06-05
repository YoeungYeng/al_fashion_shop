import { createContext, useContext, useState } from "react";

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
  selectedCategory: "",
  setSelectedCategory: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery, selectedCategory, setSelectedCategory }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);