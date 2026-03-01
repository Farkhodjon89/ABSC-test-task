import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import {
  Collapsible,
  Field,
  Input,
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
  Textarea,
  VStack,
  createListCollection,
} from '@chakra-ui/react'
import type { TaskFormValues } from '@/schemas/taskForm'
import { limits } from '@/schemas/taskForm'

interface RoutineTaskSectionProps {
  control: Control<TaskFormValues>
  open: boolean
  routineTitleError?: string
  periodicityError?: string
  routineTitleLength: number
  routineDescriptionLength: number
  periodicityCollection: ReturnType<typeof createListCollection<{ value: string; label: string }>>
}

export function RoutineTaskSection({
  control,
  open,
  routineTitleError,
  periodicityError,
  routineTitleLength,
  routineDescriptionLength,
  periodicityCollection,
}: RoutineTaskSectionProps) {
  return (
    <Collapsible.Root open={open}>
      <Collapsible.Content>
        <VStack align="stretch" gap="4" p="4" bg="gray.50" borderRadius="md">
          <Field.Root required invalid={!!routineTitleError}>
            <Field.Label>Название рутинной задачи</Field.Label>
            <Controller
              name="routineTitle"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Укажите название рутинной задачи"
                  maxLength={limits.routineTitle}
                  {...field}
                  value={field.value ?? ''}
                />
              )}
            />
            <Field.HelperText>
              {routineTitleLength}/{limits.routineTitle}
            </Field.HelperText>
            <Field.ErrorText>{routineTitleError}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!periodicityError}>
            <Field.Label>Периодичность</Field.Label>
            <Controller
              name="periodicity"
              control={control}
              render={({ field }) => (
                <SelectRoot
                  collection={periodicityCollection}
                  value={field.value ? [field.value] : []}
                  onValueChange={(e) => field.onChange(e.value[0] ?? '')}
                >
                  <SelectLabel />
                  <SelectTrigger>
                    <SelectValueText placeholder="Выберите периодичность" />
                  </SelectTrigger>
                  <Portal>
                    <SelectPositioner>
                      <SelectContent>
                        {periodicityCollection.items.map((item) => (
                          <SelectItem key={item.value} item={item}>
                            <SelectItemText>{item.label}</SelectItemText>
                            <SelectItemIndicator />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectPositioner>
                  </Portal>
                </SelectRoot>
              )}
            />
            <Field.ErrorText>{periodicityError}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>Описание рутинной задачи</Field.Label>
            <Controller
              name="routineDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="Описание рутинной задачи"
                  maxLength={limits.routineDescription}
                  {...field}
                  value={field.value ?? ''}
                />
              )}
            />
            <Field.HelperText>
              {routineDescriptionLength}/{limits.routineDescription}
            </Field.HelperText>
          </Field.Root>
        </VStack>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
