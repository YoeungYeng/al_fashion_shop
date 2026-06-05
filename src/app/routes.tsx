import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage } from './pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true,              Component: HomePage },
      { path: 'products',         Component: ProductsPage },
      { path: 'category',         Component: CategoryPage },
      { path: 'category/:slug',   Component: CategoryPage },
      { path: 'contact',          Component: ContactPage },
    ],
  },
]);
