import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { Field, Switch } from '@chakra-ui/react'
import type { TaskFormValues } from '@/schemas/taskForm'

interface AssignToTeamRadioProps {
  control: Control<TaskFormValues>
}

export function AssignToTeamRadio({ control }: AssignToTeamRadioProps) {
  return (
    <Field.Root>
      <Controller
        name="assignToTeam"
        control={control}
        render={({ field }) => (
          <Switch.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(e.checked === true)}
          >
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label>Назначить на команду</Switch.Label>
          </Switch.Root>
        )}
      />
    </Field.Root>
  )
}
