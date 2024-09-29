import { Outlet } from 'react-router-dom';
import LoggedUserSidebar from '@/features/LoggedUserSidebar/LoggedUserSidebar.component.tsx';

const AuthorizedLayout = () => {
  return (
    <div className="flex flex-row">
      <LoggedUserSidebar username={'Cezary Skorupski'} tokenCount={27}></LoggedUserSidebar>
      <Outlet />
    </div>
  );
};

export default AuthorizedLayout;
