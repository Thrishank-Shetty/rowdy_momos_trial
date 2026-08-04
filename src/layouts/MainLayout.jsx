import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import { useMenuData } from '../hooks/useMenuData';

export default function MainLayout() {
  const { restaurant } = useMenuData();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar restaurant={restaurant} />
      <main className="flex-1">
        <Outlet context={{ restaurant }} />
      </main>
      <Footer restaurant={restaurant} />
      <CartDrawer />
    </div>
  );
}
