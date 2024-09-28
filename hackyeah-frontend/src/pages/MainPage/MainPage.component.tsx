import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery';
import { useEffect } from 'react';
import LoginPage from '../Login/LoginPage.component';

const MainPage = () => {
  const { data, isError, error } = useActuatorExampeQuery({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-row justify-center pt-5">
      {isError && <div>{error?.message}</div>}
      <LoginPage />
    </div>
  );
};

export default MainPage;
