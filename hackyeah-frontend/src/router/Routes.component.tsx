import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RoutePaths} from './Routes.types';
import LoginPage from '@/pages/Login/LoginPage.component';
import RegisterPage from '@/pages/Register/RegisterPage.component';
import AuthorizedLayout from '@/features/AuthorizedLayout.component.tsx';
import HomePage from '@/pages/home-page/home-page.tsx';
import Dashboard from '@/pages/Dashboard/Dashboard.component';
import AddMaterial from '@/pages/AddMaterial/AddMaterial.component.tsx';
import AboutUs from '@/pages/about-us/about-us.tsx';
import FAQView from '@/pages/faq/faq.tsx';
import TokenManagement from '@/pages/TokenManagement/TokenManagement.component';
import Contact from '@/pages/contact/contact.tsx';
import DetailedNoteView from '@/pages/detailed-note-view/detailed-note-view.tsx';

const AppRoutes: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to={RoutePaths.MAIN_PAGE} replace />} /> */}
        <Route path="/auth">
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route path={RoutePaths.MAIN_PAGE} element={<HomePage />} />
        <Route path={RoutePaths.ABOUT} element={<AboutUs />} />
        <Route path={RoutePaths.FAQ} element={<FAQView />} />
        <Route path={RoutePaths.CONTACT} element={<Contact />} />
        <Route path="/test" element={<DetailedNoteView />} />
        <Route path="/" element={<AuthorizedLayout />}>
          <Route path={RoutePaths.DASHBOARD} element={<Dashboard />} />
          <Route path={RoutePaths.TOKEN_MANAGEMENT} element={<TokenManagement />} />
          <Route path={RoutePaths.ADD_MATERIAL} element={<AddMaterial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
