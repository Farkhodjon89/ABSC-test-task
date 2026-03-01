import { Card, Button, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createListCollection } from '@chakra-ui/react'
import { getThemes, getTags, getPeriodicityOptions, getParticipants, getTeams, createTask } from '@/api/mock'
import { toaster } from '@/components/ui/toaster'
import { taskFormSchema, defaultValues, type TaskFormValues } from '@/schemas/taskForm'
import { SingleSelectField } from '@/components/ui/SingleSelectField'
import { MultiSelectField } from '@/components/ui/MultiSelectField'
import {
  TaskFormHeader,
  TaskContextField,
  AssignToTeamRadio,
  RoutineCheckbox,
  DeadlineFields,
  RoutineTaskSection,
  FileUploadField,
} from '@/components/task-form'

export function TaskCreationForm() {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  })

  const assignToTeamValue = form.watch('assignToTeam')
  const routine = form.watch('routine')
  const contextLength = form.watch('context')?.length ?? 0
  const routineTitleLength = form.watch('routineTitle')?.length ?? 0
  const routineDescriptionLength = form.watch('routineDescription')?.length ?? 0
  const [files, setFiles] = useState<File[]>([])

  const { data: participants = [] } = useQuery({
    queryKey: ['participants'],
    queryFn: getParticipants,
  })
  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  })

  const participantsCollection = useMemo(
    () => createListCollection({ items: participants.map((p) => ({ value: p.id, label: p.name })) }),
    [participants]
  )
  const teamsCollection = useMemo(
    () => createListCollection({ items: teams.map((t) => ({ value: t.id, label: t.name })) }),
    [teams]
  )
  const assigneesCollection = assignToTeamValue ? teamsCollection : participantsCollection

  useEffect(() => {
    form.setValue('assigneeIds', [])
  }, [assignToTeamValue, form])

  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
  })
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  })
  const { data: periodicityOptions = [] } = useQuery({
    queryKey: ['periodicity'],
    queryFn: getPeriodicityOptions,
  })

  const themeCollection = useMemo(
    () => createListCollection({ items: themes.map((t) => ({ value: t.id, label: t.name })) }),
    [themes]
  )
  const tagsCollection = useMemo(
    () => createListCollection({ items: tags.map((t) => ({ value: t.id, label: t.name })) }),
    [tags]
  )
  const periodicityCollection = useMemo(
    () =>
      createListCollection({
        items: periodicityOptions.map((p) => ({ value: p.value, label: p.label })),
      }),
    [periodicityOptions]
  )

  const onSubmit = useCallback(
    async (values: TaskFormValues) => {
      await createTask({
        context: values.context,
        assignToTeam: values.assignToTeam,
        routine: values.routine,
        assigneeIds: values.assigneeIds,
        deadlineDate: values.deadlineDate,
        deadlineTime: values.deadlineTime,
        routineDays: values.routineDays,
        themeId: values.themeId,
        tagIds: values.tagIds,
        routineTitle: values.routineTitle,
        periodicity: values.periodicity,
        routineDescription: values.routineDescription,
        files,
      })
      toaster.create({
        title: 'Задача создана',
        description: 'Задача успешно создана',
        type: 'success',
      })
      form.reset(defaultValues)
      setFiles([])
    },
    [form]
  )

  return (
    <Card.Root size="lg" variant="elevated">
      <Card.Header>
        <TaskFormHeader />
      </Card.Header>
      <Card.Body asChild>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <VStack align="stretch" gap="5">
            <TaskContextField
              control={form.control}
              error={form.formState.errors.context?.message}
              valueLength={contextLength}
            />

            <AssignToTeamRadio control={form.control} />

            <RoutineCheckbox
              checked={routine}
              onCheckedChange={(checked) => form.setValue('routine', checked)}
            />

            <RoutineTaskSection
              control={form.control}
              open={routine}
              routineTitleError={form.formState.errors.routineTitle?.message}
              periodicityError={form.formState.errors.periodicity?.message}
              routineTitleLength={routineTitleLength}
              routineDescriptionLength={routineDescriptionLength}
              periodicityCollection={periodicityCollection}
            />

            <MultiSelectField
              label="Исполнители задачи"
              placeholder="Укажите исполнителей проекта"
              collection={assigneesCollection}
              value={form.watch('assigneeIds') ?? []}
              onChange={(ids) => form.setValue('assigneeIds', ids)}
            />

            <DeadlineFields control={form.control} isRoutine={routine} />

            <SingleSelectField
              label="Указать тему"
              placeholder="Выберите тему"
              collection={themeCollection}
              value={form.watch('themeId') ?? ''}
              onChange={(v) => form.setValue('themeId', v)}
            />

            <MultiSelectField
              label="Теги"
              placeholder="Укажите соответствующие теги"
              collection={tagsCollection}
              value={form.watch('tagIds') ?? []}
              onChange={(v) => form.setValue('tagIds', v)}
            />

            <FileUploadField value={files} onChange={setFiles} />

            <Button
              type="submit"
              colorPalette="purple"
              variant="solid"
              bg="purple.600"
              color="white"
              _hover={{ bg: 'purple.700' }}
              loading={form.formState.isSubmitting}
            >
              Создать задачу
            </Button>
          </VStack>
        </form>
      </Card.Body>
    </Card.Root>
  )
}
