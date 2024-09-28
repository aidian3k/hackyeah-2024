import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LoggedUserSidebar from '@/features/LoggedUserSidebar/LoggedUserSidebar.component.tsx';

const AuthorizedLayout = () => {
  const { data, isError, error } = useActuatorExampeQuery({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-row">
      <LoggedUserSidebar username={'Cezary Skorupski'} tokenCount={27}></LoggedUserSidebar>
      <Outlet />
    </div>
  );
};

export default AuthorizedLayout;
