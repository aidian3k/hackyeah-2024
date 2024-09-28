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
    <div className="flex flex-row justify-center pt-5">
      <Tabs defaultValue="account" className="w-3/4">
  <TabsList>
    <TabsTrigger value="mine">Moje notatki</TabsTrigger>
    <TabsTrigger value="bought">Wymienione notatki</TabsTrigger>
  </TabsList>
  <TabsContent value="mine"><Tree /></TabsContent>
  <TabsContent value="bought"><Tree /></TabsContent>
</Tabs>

      </div>
    )
}

export default Dashboard;