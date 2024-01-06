<<<<<<< HEAD
import { AboutScreen } from 'feature/about/presentation';
import { LoginScreen } from 'feature/auth/presentation';
=======
import { AdminPanelScreen } from 'feature/adminPanel/presentation';
import { LoginScreen, RegisterScreen } from 'feature/auth/presentation';
>>>>>>> 53df5583ba0db6cfba244cd42c1a802a8f93ec09
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
        <AboutScreen />
      </ProtectedRoute>
    )
  },
  {
    path: '/*',
    Component: () => <NotFoundScreen />
  }
]);
