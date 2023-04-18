import { RouterProvider } from 'react-router-dom';
import { routers } from './router';

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
