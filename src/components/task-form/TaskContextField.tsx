import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { Field, Textarea } from '@chakra-ui/react'
import type { TaskFormValues } from '@/schemas/taskForm'
import { limits } from '@/schemas/taskForm'

interface TaskContextFieldProps {
  control: Control<TaskFormValues>
  error?: string
  valueLength: number
}

export function TaskContextField({ control, error, valueLength }: TaskContextFieldProps) {
  return (
    <Field.Root invalid={!!error} required>
      <Field.Label>Контекст задачи</Field.Label>
      <Controller
        name="context"
        control={control}
        render={({ field }) => (
          <Textarea
            placeholder="Выполнить какую-нибудь задачу"
            maxLength={limits.context}
            {...field}
          />
        )}
      />
      <Field.HelperText>
        {valueLength}/{limits.context}
      </Field.HelperText>
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  )
}
