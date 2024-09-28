import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { RoutePaths } from './Routes.types';
import { BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.component';
import LoginPage from '@/pages/Login/LoginPage.component';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import RegisterPage from '@/pages/Register/RegisterPage.component';

const AppRoutes: FC = () => {
  const { authenticated } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.REGISTER} element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
