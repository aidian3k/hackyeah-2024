import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';
import { RoutePaths } from './Routes.types';

interface IProps {
  authenticated: boolean;
  children: React.ReactNode;
}

const PrivateRoute: FC<IProps> = ({ authenticated, children }) => {
  if (!authenticated) return <Navigate to={RoutePaths.LOGIN} />;

  return <>{children}</>;
};

export default PrivateRoute;
