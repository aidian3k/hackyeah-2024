import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Tree from '@/pages/Dashboard/tree';

import { useActuatorExampeQuery } from '@/api/query/actuatorExampleQuery';

const Dashboard = () => {
  const { data, isError, error } = useActuatorExampeQuery({});

  const [activeTrigger, setActiveTrigger] = useState('mine');

  return (
    <div className="flex w-full border rounded m-5">
      <Tabs defaultValue="mine" onValueChange={setActiveTrigger} className="pt-5 w-full">
        <div className="flex justify-center pb-5">
          <TabsList>
            <TabsTrigger value="mine" className={`data-[state=active]:bg-[#16a34a] data-[state=active]:text-white`}>
              Moje notatki
            </TabsTrigger>
            <TabsTrigger className={`data-[state=active]:bg-[#16a34a] data-[state=active]:text-white`} value="bought">
              Wymienione notatki
            </TabsTrigger>
          </TabsList>
        </div>
        <hr />

        <TabsContent value="mine">
          <div className="flex justify-between align-middle mr-5 p-0">
            <Tree />
            <Button size="icon" className="">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="bought">
          <Tree />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
