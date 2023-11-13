import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './protectedRoute';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    Component: () => <div>Home</div>
  },
  {
    path: '/about',
    Component: () => (
      <ProtectedRoute>
        <div>About</div>
      </ProtectedRoute>
    )
  }
]);
