import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import NotFound from '../pages/NotFound';
import ErrorPage from '../pages/ErrorPage';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Orders from '../pages/admin/Orders';
import MenuManagement from '../pages/admin/MenuManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import Tables from '../pages/admin/Tables';
import Profile from '../pages/admin/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'order-success', element: <OrderSuccess /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'orders', element: <Orders /> },
      { path: 'menu', element: <MenuManagement /> },
      { path: 'categories', element: <CategoryManagement /> },
      { path: 'tables', element: <Tables /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
