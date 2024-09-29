import React from 'react';
import { Clapperboard, FileText, PencilLine, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MaterialTile = material => {
  material = material.material;
  console.log(material.descr);

  return (
    <Card className="w-[350px] border-[#16a34a] overflow-hidden relative mb-5 mx-5">
      <CardHeader className=" rounded-t-l grid grid-cols-2 grid-rows-1 bg-[#16a34a] p-4 clip-card-header">
        <div className="">
          <h1>{material.title}</h1>
          <h2>{material.subject}</h2>
          <h3>{material.author}</h3>
        </div>
        <div className="text-right">
          {material.date} <br />
          {material.grade} <br />
          {material.used} <br />
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-2">
          <h3 className="mb-2 text-[#16a34a]">Opis</h3>
          {material.descr}
        </div>{' '}
        <hr />
        <div className="flex justify-evenly w-full m-2">
          {material.dataTypes.video !== 0 && (
            <div className="inline-block">
              <Clapperboard />
              <div>{material.dataTypes.video}</div>
            </div>
          )}
          {material.dataTypes.pdf !== 0 && (
            <div className="inline-block">
              <FileText />
              <div>{material.dataTypes.pdf}</div>
            </div>
          )}
          {material.dataTypes.written !== 0 && (
            <div className="inline-block">
              <PencilLine />
              <div>{material.dataTypes.written}</div>
            </div>
          )}
          {material.dataTypes.call !== 0 && (
            <div className="inline-block">
              <Phone />
              <div>{material.dataTypes.call}</div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>Zdobądź materiał - 1 żeton</Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialTile;
