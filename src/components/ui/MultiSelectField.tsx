import {
  Field,
  Portal,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from '@chakra-ui/react'
import type { SelectOption } from '@/types/taskForm'

export interface MultiSelectFieldProps {
  label: string
  placeholder?: string
  collection: ReturnType<typeof createListCollection<SelectOption>>
  value: string[]
  onChange: (value: string[]) => void
}

export function MultiSelectField({
  label,
  placeholder,
  collection,
  value,
  onChange,
}: MultiSelectFieldProps) {
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <SelectRoot
        collection={collection}
        value={value}
        onValueChange={(e) => onChange(e.value)}
        multiple
      >
        <SelectLabel />
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <Portal>
          <SelectPositioner>
            <SelectContent>
              {collection.items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              ))}
            </SelectContent>
          </SelectPositioner>
        </Portal>
      </SelectRoot>
    </Field.Root>
  )
}
