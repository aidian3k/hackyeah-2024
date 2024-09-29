import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import React, { useState } from "react";
import AddHighSchoolMaterialForm from "@/pages/AddMaterial/AddHighSchoolMaterialForm.component.tsx";
import AddUniversityMaterialForm from "@/pages/AddMaterial/AddUniversityMaterialForm.component.tsx";

const AddMaterial = () => {
  const [activeTrigger, setActiveTrigger] = useState('university');

  return (
    <div className="flex w-full border rounded">
      <Tabs defaultValue="university" onValueChange={setActiveTrigger} className="pt-5 w-full">
        <div className="flex justify-center pb-5">
          <TabsList>
            <TabsTrigger value="university" className={`data-[state=active]:bg-primary data-[state=active]:text-white`}>
              Szkoła Wyższa
            </TabsTrigger>
            <TabsTrigger value="highSchool" className={`data-[state=active]:bg-primary data-[state=active]:text-white`}>
              Szkoła Średnia
            </TabsTrigger>
            <TabsTrigger value="others" className={`data-[state=active]:bg-primary data-[state=active]:text-white`}>
              Inne
            </TabsTrigger>
          </TabsList>
        </div>
        <hr />

        <TabsContent value="university">
          <AddUniversityMaterialForm />
        </TabsContent>

        <TabsContent value="highSchool">
          <AddHighSchoolMaterialForm />
        </TabsContent>

        <TabsContent value="others">
          I na chuj tak testujesz
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddMaterial;
