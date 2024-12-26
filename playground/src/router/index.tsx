import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ErrorPages } from '../pages/error-page';
import { ExperimentsPage } from '../pages/experiments-page.tsx';
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
        element: <ExperimentsPage />,
      },
    ],
  },
  {
    path: 'error',
    element: <ErrorPages />,
  },
]);
