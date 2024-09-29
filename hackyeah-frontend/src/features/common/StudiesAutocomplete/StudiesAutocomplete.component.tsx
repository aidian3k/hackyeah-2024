import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useGetUnits } from '@/api/query/unitsQuery';
import { useGetStudies } from '@/api/query/studiesQuery';

type StudiesAutocompleteProps = {
  studyFieldName: string;
  unitFieldName: string;
};

const StudiesAutocomplete: React.FC<StudiesAutocompleteProps> = ({ studyFieldName, unitFieldName }) => {
  const [open, setOpen] = useState(false);
  const { watch, setValue } = useFormContext();
  const currentUnit = watch(unitFieldName);
  const currentStudy = watch(studyFieldName);
  const { data: studies, isLoading, isSuccess } = useGetStudies({ institutionUid: currentUnit });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between max-w-full md:max-w-64">
          {currentStudy && isSuccess ? studies.courses.find(study => study.uid === currentStudy)?.name : 'Wybierz kierunek'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Wybierz kierunek" />
          <CommandList>
            <CommandEmpty>Nie znaleziono kierunku</CommandEmpty>
            <CommandGroup>
              {isSuccess &&
                studies.courses.map(course => (
                  <CommandItem
                    key={course.uid}
                    value={course.name}
                    onSelect={currentValue => {
                      setValue(studyFieldName, course.uid);
                      setOpen(false);
                    }}
                  >
                    {course.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StudiesAutocomplete;
