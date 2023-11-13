import { type JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { browserRouter } from './routes';

export const Router = (): JSX.Element => {
  return <RouterProvider router={browserRouter} />;
};
