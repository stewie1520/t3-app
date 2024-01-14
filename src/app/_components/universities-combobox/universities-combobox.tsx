"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { type IUniversity } from "@/app/_models/university.interface"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { api } from "@/trpc/react"
import { useCallback, useEffect, useState, type FC } from "react"

interface IProps {
  id?: string
  value?: IUniversity
  onChange?: (university: IUniversity) => void
}

export const UniversitiesCombobox: FC<IProps> = (props) => {
  const universitiesQuery = api.university.getAllUniversities.useQuery()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<IUniversity["id"] | undefined>(props.value?.id)

  useEffect(() => {
    if (props.value) {
      setValue(props.value.id)
    }
  }, [props.value])

  const handleOnChange = useCallback((value: string) => {
    setValue(value)
    
    if (props.onChange) {
      const university = universitiesQuery.data?.find((university) => university.name.toLowerCase() === value)
      if (university) {
        props.onChange(university)
      }
    }
  }, [props, universitiesQuery.data])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={props.id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="text-wrap line-clamp-1 text-ellipsis flex-1 text-left">
            {value
              ? universitiesQuery.data?.find((university) => university.name.toLowerCase() === value)?.name
              : "Select university..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] max-h-[400px] overflow-auto p-0">
        <Command>
          <CommandInput placeholder="Search university..." />
          <CommandEmpty>No university found.</CommandEmpty>
          <CommandGroup>
            {universitiesQuery.data?.map((university) => (
              <CommandItem
                key={university.id}
                value={university.name}
                onSelect={(currentValue) => {
                  handleOnChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-blue-500",
                    value === university.name.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="text-wrap w-full max-w-[300px]">
                  {university.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
