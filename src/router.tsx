import { createBrowserRouter } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { Main } from './pages/Main';
import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/form',
        element: <FormPage />,
      },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
