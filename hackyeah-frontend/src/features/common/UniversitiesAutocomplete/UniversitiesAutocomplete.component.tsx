import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useGetAcademicInstitutions } from '@/api/query/academicInstitutionsQuery';
import { useFormContext } from 'react-hook-form';
import { current } from '@reduxjs/toolkit';

type UniversitiesAutocompleteProps = {
  fieldName: string;
  wFull?: boolean;
};

const UniversitiesAutocomplete: React.FC<UniversitiesAutocompleteProps> = ({ fieldName, wFull }) => {
  const [open, setOpen] = useState(false);

  // Get form context values
  const { register, setValue, watch } = useFormContext();

  // Watch the current value of the institution field
  const currentInstitution = watch(fieldName);

  // Fetch academic institutions using the custom query hook
  const { data: academicInstitutions, isLoading, isSuccess } = useGetAcademicInstitutions({ name: currentInstitution });

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="flex justify-between truncate  max-w-full md:max-w-64">
            {currentInstitution && isSuccess
              ? academicInstitutions?.institutions.find(institution => institution.id === currentInstitution)?.name
              : 'Wybierz uczelnię'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command className="">
            <CommandInput className="" placeholder="Wybierz uczelnię" />
            <CommandList>
              <CommandEmpty>Nie znaleziono uczelni</CommandEmpty>
              <CommandGroup>
                {isSuccess &&
                  academicInstitutions?.institutions.map(institution => (
                    <CommandItem
                      key={institution.id}
                      value={institution.name}
                      onSelect={currentValue => {
                        setValue(fieldName, institution.id);
                        setOpen(false);
                      }}
                    >
                      {institution.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  );
};

export default UniversitiesAutocomplete;
