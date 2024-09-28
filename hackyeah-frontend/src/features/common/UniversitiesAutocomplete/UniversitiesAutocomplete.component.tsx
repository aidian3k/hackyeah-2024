import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useGetAcademicInstitutions } from '@/api/query/academicInstitutionsQuery';
import { useFormContext } from 'react-hook-form';

type UniversitiesAutocompleteProps = {
  fieldName: string;
};

const UniversitiesAutocomplete: React.FC<UniversitiesAutocompleteProps> = ({ fieldName }) => {
  const [open, setOpen] = useState(false);

  // Get form context values
  const { register, setValue, watch } = useFormContext();

  // Watch the current value of the institution field
  const currentInstitution = watch(fieldName);

  // Fetch academic institutions using the custom query hook
  const { data: academicInstitutions, isLoading, isSuccess } = useGetAcademicInstitutions({ name: currentInstitution });

  return (
    <div>
      {/* Register the field */}
      <input type="hidden" {...register(fieldName)} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {currentInstitution && isSuccess
              ? academicInstitutions?.institutions.find(institution => institution.name === currentInstitution)?.name
              : 'Wybierz uczelnię'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Wybierz uczelnię" />
            <CommandList>
              <CommandEmpty>Nie znaleziono uczelni</CommandEmpty>
              <CommandGroup>
                {isSuccess &&
                  academicInstitutions?.institutions.map(institution => (
                    <CommandItem
                      key={institution.id}
                      value={institution.name}
                      onSelect={currentValue => {
                        // Update form value when an institution is selected
                        setValue(fieldName, currentValue === institution.name ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', currentInstitution === institution.name ? 'opacity-100' : 'opacity-0')} />
                      {institution.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UniversitiesAutocomplete;
