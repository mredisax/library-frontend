import { AdminPanelScreen } from 'feature/adminPanel/presentation';
import { LoginScreen, RegisterScreen } from 'feature/auth/presentation';
import { DashboardScreen } from 'feature/dashboard/presentation';
import { NotFoundScreen } from 'feature/notFound/presentation/notFound.screen';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './protectedRoute';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    Component: () => (
      <ProtectedRoute>
        <DashboardScreen />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    Component: LoginScreen
  },
  {
    path: '/register',
    Component: RegisterScreen
  },
  {
    path: '/admin',
    Component: () => (
      <ProtectedRoute>
        <AdminPanelScreen />
      </ProtectedRoute>
    )
  },
  {
    path: '/about',
    Component: () => (
      <ProtectedRoute>
        <div>About</div>
      </ProtectedRoute>
    )
  },
  {
    path: '/*',
    Component: () => <NotFoundScreen />
  }
]);
