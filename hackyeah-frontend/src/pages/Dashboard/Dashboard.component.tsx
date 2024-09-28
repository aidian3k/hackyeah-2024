import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
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
          
          <TabsContent value="mine">
            <div className="flex justify-between mr-5">
              <Tree />
              <Button size="icon" className="m-5">
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
}

export default Dashboard;