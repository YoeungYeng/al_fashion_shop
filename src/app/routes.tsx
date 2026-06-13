import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

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
      // product details page
      { path: 'products/:slug',      Component: ProductDetailPage },
    ],
  },
]);
