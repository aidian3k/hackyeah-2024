import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useGetUnits } from '@/api/query/unitsQuery';

type FacultiesAutocompleteProps = {
  institutionFieldName: string;
  unitFieldName: string;
};

const FacultiesAutocomplete: React.FC<FacultiesAutocompleteProps> = ({ institutionFieldName, unitFieldName }) => {
  const [open, setOpen] = useState(false);
  const { watch, setValue } = useFormContext();
  const currentFaculty = watch(unitFieldName);
  const currentInstitution = watch(institutionFieldName);
  const { data: units, isLoading, isSuccess } = useGetUnits({ institutionId: currentFaculty.uid });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {currentFaculty && isSuccess ? units.units.find(units => units.name === currentFaculty.name)?.name : 'Wybierz wydział'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Wybierz wydział" />
          <CommandList>
            <CommandEmpty>Nie znaleziono wydziału</CommandEmpty>
            <CommandGroup>
              {isSuccess &&
                units.units.map(unit => (
                  <CommandItem
                    key={unit.uid}
                    value={unit.name}
                    onSelect={currentValue => {
                      setValue(unitFieldName, currentValue === unit.name ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', currentFaculty.name === unit.name ? 'opacity-100' : 'opacity-0')} />
                    {unit.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FacultiesAutocomplete;