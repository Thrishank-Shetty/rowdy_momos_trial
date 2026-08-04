import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { router } from './routes/router';

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ToastProvider>
  );
}
