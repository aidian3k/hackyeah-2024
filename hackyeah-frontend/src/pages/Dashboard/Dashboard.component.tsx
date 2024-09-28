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
      <div className="flex w-full border rounded m-5">
        <Tabs defaultValue="mine" className="pt-5 w-full">
          <div className="flex justify-center pb-5">
            <TabsList>
              <TabsTrigger value="mine">Moje notatki</TabsTrigger>
              <TabsTrigger value="bought">Wymienione notatki</TabsTrigger>
            </TabsList>
          </div>
          <hr />
          
          <TabsContent value="mine" className="">
            <Tree />
          </TabsContent>
          
          <TabsContent value="bought" className="">
            <Tree />
          </TabsContent>
        </Tabs>
      </div>
    );
}

export default Dashboard;