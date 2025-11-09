import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumb from './components/Breadcrumb';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ScrollToTop />
      <Navigation />
      <Breadcrumb />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}