/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Login from './pages/Login';
import About from './pages/About';
import Account from './pages/Account';
import CustomerRoute from './components/CustomerRoute';

import AdminRoute from './admin/AdminRoute';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminOrders from './admin/pages/AdminOrders';
import ProductManager from './admin/pages/ProductManager'; // Will create this next
import HomeEditor from './admin/pages/HomeEditor'; // Will create this next
import AdminHeroBanner from './admin/pages/AdminHeroBanner';
import AdminCategories from './admin/pages/AdminCategories';
import AdminCollections from './admin/pages/AdminCollections';
import AdminAbout from './admin/pages/AdminAbout';
import AdminContact from './admin/pages/AdminContact';
import AdminMedia from './admin/pages/AdminMedia';
import AdminLiveSales from './admin/pages/AdminLiveSales';
import AdminNewsletter from './admin/pages/AdminNewsletter';
import AdminSettings from './admin/pages/AdminSettings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'login', element: <Login /> },
      {
        element: <CustomerRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: 'shop', element: <Shop /> },
          { path: 'collections', element: <Shop /> },
          { path: 'about', element: <About /> },
          { path: 'contact', element: <Contact /> },
          { path: 'faq', element: <Contact /> },
          { path: 'support', element: <Contact /> },
          { path: 'account', element: <Account /> },
        ],
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'products', element: <ProductManager /> },
      { path: 'home', element: <HomeEditor /> },
      { path: 'hero-banners', element: <AdminHeroBanner /> },
      { path: 'categories', element: <AdminCategories /> },
      { path: 'collections', element: <AdminCollections /> },
      { path: 'about', element: <AdminAbout /> },
      { path: 'contact', element: <AdminContact /> },
      { path: 'media', element: <AdminMedia /> },
      { path: 'live-sales', element: <AdminLiveSales /> },
      { path: 'newsletter', element: <AdminNewsletter /> },
      { path: 'settings', element: <AdminSettings /> },
      // Fallback for missing admin pages
      { path: '*', element: <div className="p-8 text-center text-gray-500">Page under construction</div> },
    ],
  },
]);

import { CMSProvider } from './context/CMSContext';
import { AuthProvider } from './context/AuthContext';
import { CustomerProvider } from './context/CustomerContext';

export default function App() {
  return (
    <CMSProvider>
      <AuthProvider>
        <CustomerProvider>
          <RouterProvider router={router} />
        </CustomerProvider>
      </AuthProvider>
    </CMSProvider>
  );
}
