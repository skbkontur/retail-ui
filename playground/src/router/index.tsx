import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ErrorPages } from '../pages/error-page';
import { ExpirementsPage } from '../pages/expirements-page';
import { IndexPage } from '../pages/Index-page';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <IndexPage />,
      },
      {
        path: 'expirements',
        element: <ExpirementsPage />,
      },
    ],
  },
  {
    path: 'error',
    element: <ErrorPages />,
  },
]);
