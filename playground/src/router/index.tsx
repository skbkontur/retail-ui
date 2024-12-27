import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ErrorPages } from '../pages/error-page';
import { ExperimentsPage } from '../pages/experiments-page';
import { IndexPage } from '../pages/index-page';
import { MassActionPanelPage } from '../pages/mass-actions-panel-page';

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
      {
        path: 'mass-actions-panel',
        element: <MassActionPanelPage />,
      },
    ],
  },
  {
    path: 'error',
    element: <ErrorPages />,
  },
]);
