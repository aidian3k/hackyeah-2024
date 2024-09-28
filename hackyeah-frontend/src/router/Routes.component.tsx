import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePaths } from './Routes.types';
import LoginPage from '@/pages/Login/LoginPage.component';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import RegisterPage from '@/pages/Register/RegisterPage.component';
import AuthorizedLayout from '@/features/AuthorizedLayout.component.tsx';
import HomePage from '@/pages/home-page/home-page.tsx';
import Dashboard from '@/pages/Dashboard/Dashboard.component';
import AddMaterial from "@/pages/AddMaterial/AddMaterial.component.tsx";

const AppRoutes: FC = () => {
  const { authenticated } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to={RoutePaths.MAIN_PAGE} replace />} /> */}
        <Route path="/auth">
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.REGISTER} element={<RegisterPage />} />
        </Route>
          <Route path={RoutePaths.MAIN_PAGE} element={<HomePage />} />
        <Route path="/" element={<AuthorizedLayout />}>
          <Route path={RoutePaths.DASHBOARD} element={<Dashboard />} />
          <Route path={RoutePaths.ADD_MATERIAL} element={<AddMaterial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
