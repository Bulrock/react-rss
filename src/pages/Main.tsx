import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
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
