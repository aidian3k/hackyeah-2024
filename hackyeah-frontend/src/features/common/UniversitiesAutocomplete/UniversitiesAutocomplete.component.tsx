import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useGetAcademicInstitutions } from "@/api/query/academicInstitutionsQuery"

const UniversitiesAutocomplete = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const { data: academicInstitutions, isLoading, isSuccess } = useGetAcademicInstitutions({ name: value })
   
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value && isSuccess
              ? academicInstitutions.institutions.find((academicInstitutions) => academicInstitutions.name === value)?.name
              : "Wybierz uczelnię"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Wybierz uczelnię" />
            <CommandList>
              <CommandEmpty>Nie znaleziono uczelni</CommandEmpty>
              <CommandGroup>
                {isSuccess && academicInstitutions.institutions.map((institution) => (
                  <CommandItem
                    key={institution.id}
                    value={institution.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === institution.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {institution.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
}

export default UniversitiesAutocomplete;