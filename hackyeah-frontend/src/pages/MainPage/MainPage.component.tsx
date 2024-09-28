import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery';
import { useEffect } from 'react';

const MainPage = () => {
  const { data, isError, error } = useActuatorExampeQuery({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-row justify-center pt-5">
      {isError && <div>{error?.message}</div>}
      <h1>Main page</h1>
    </div>
  );
};

export default MainPage;
