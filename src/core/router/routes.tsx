import { LoginScreen } from 'feature/presentation';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './protectedRoute';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    Component: () => (
      <ProtectedRoute>
        <div>Home</div>
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    Component: LoginScreen
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
