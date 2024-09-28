import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery';
import { useEffect } from 'react';
import LoggedUserSidebar from "@/features/LoggedUserSidebar/LoggedUserSidebar.component.tsx";
import { Outlet } from "react-router-dom";

const AuthorizedLayout = () => {
  const { data, isError, error } = useActuatorExampeQuery({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-row">
      {isError && <div>{error?.message}</div>}
      <LoggedUserSidebar username={"Cezary Skorupski"} tokenCount={27}></LoggedUserSidebar>
      <Outlet />
    </div>
  );
};

export default AuthorizedLayout;
