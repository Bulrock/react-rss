import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
