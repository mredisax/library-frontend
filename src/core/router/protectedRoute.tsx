import { type JSX } from 'react';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
  // TODO: Implement auth check here
  return children;
};
