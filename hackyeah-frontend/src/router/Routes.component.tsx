import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { RoutePaths } from './Routes.types';
import { BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage.component';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import RegisterPage from '@/pages/Register/RegisterPage.component';
import AuthorizedLayout from '@/features/AuthorizedLayout.component.tsx';
import HomePage from '@/pages/home-page/home-page.tsx';
import Dashboard from '@/pages/Dashboard/Dashboard.component';

const AppRoutes: FC = () => {
  const { authenticated } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth">
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.REGISTER} element={<RegisterPage />} />
          <Route path={RoutePaths.DASHBOARD} element={<Dashboard />} />
        </Route>
        <Route path="/" element={<AuthorizedLayout />}></Route>
        <Route path={RoutePaths.MAIN_PAGE} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
