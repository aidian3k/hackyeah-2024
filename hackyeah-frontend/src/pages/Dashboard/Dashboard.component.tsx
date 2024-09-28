import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Tree from "@/components/tree";

import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery';
import { useEffect } from 'react';

const Dashboard = () => {
    const { data, isError, error } = useActuatorExampeQuery({});

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
    <div className="flex justify-center pt-5 border rounded h-4/5 w-4/5 m-5">
      <Tabs defaultValue="mine" className="flex flex-col justify-center w-full">
        <div className="flex justify-center"><TabsList>
    <TabsTrigger value="mine">Moje notatki</TabsTrigger>
    <TabsTrigger value="bought">Wymienione notatki</TabsTrigger>
  </TabsList></div>
  
  <TabsContent value="mine" className="flex flex-col justify-center"><Tree /></TabsContent>
  <TabsContent value="bought" className="flex flex-col justify-center"><Tree /></TabsContent>
</Tabs>

      </div>
    )
}

export default Dashboard;