import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import {
  Field,
  HStack,
  Input,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputRoot,
} from '@chakra-ui/react'
import type { TaskFormValues } from '@/schemas/taskForm'

interface DeadlineFieldsProps {
  control: Control<TaskFormValues>
  isRoutine: boolean
}

export function DeadlineFields({ control, isRoutine }: DeadlineFieldsProps) {
  if (!isRoutine) {
    return (
      <HStack gap="4" align="flex-end" flexWrap="wrap">
        <Field.Root flex="1" minW="160px">
          <Field.Label>Срок выполнения</Field.Label>
          <HStack gap="2">
            <Controller
              name="deadlineDate"
              control={control}
              render={({ field }) => (
                <Input type="date" placeholder="дд.мм.гггг" {...field} />
              )}
            />
            <Controller
              name="deadlineTime"
              control={control}
              render={({ field }) => (
                <Input type="time" placeholder="--:--" {...field} />
              )}
            />
          </HStack>
        </Field.Root>
      </HStack>
    )
  }

  return (
    <HStack gap="4" align="flex-end">
      <Controller
        name="routineDays"
        control={control}
        render={({ field }) => (
          <NumberInputRoot
            value={String(field.value ?? 0)}
            onValueChange={(e) => field.onChange(e.valueAsNumber ?? 0)}
            min={0}
          >
            <NumberInputLabel>Дней</NumberInputLabel>
            <NumberInputControl>
              <NumberInputDecrementTrigger />
              <NumberInputInput />
              <NumberInputIncrementTrigger />
            </NumberInputControl>
          </NumberInputRoot>
        )}
      />
      <Controller
        name="deadlineTime"
        control={control}
        render={({ field }) => (
          <Field.Root>
            <Field.Label>Время</Field.Label>
            <Input type="time" placeholder="--:--" {...field} />
          </Field.Root>
        )}
      />
    </HStack>
  )
}
