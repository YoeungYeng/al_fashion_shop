import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './context/LanguageContext';
import { SearchProvider } from './context/SearchContext';

export default function App() {
  return (
    <SearchProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </SearchProvider>
  );
}
