import React from 'react';
import { Clapperboard, FileText, PencilLine } from 'lucide-react';

const MaterialTile = material => {
  return (
    <div>
      <div>
        <div>
          <h1>{material}</h1>
          <h2>{material}</h2>
          <h3>{material}</h3>
        </div>
        <div>
          {material} <br />
          {material} <br />
          {material} <br />
        </div>
      </div>
      <h2>{material}</h2> <hr />
      <div>
        <Clapperboard />
        <div>{material}</div>
      </div>
      <div>
        <FileText />
        <div>{material}</div>
      </div>
      <div>
        <PencilLine />
        <div>{material}</div>
      </div>
    </div>
  );
};

export default MaterialTile;
