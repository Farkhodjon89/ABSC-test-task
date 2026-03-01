import { z } from 'zod'

const MAX_CONTEXT = 4096
const MAX_ROUTINE_TITLE = 255
const MAX_ROUTINE_DESC = 1024

export const taskFormSchema = z
  .object({
    context: z.string().min(1, 'Обязательное поле').max(MAX_CONTEXT),
    assignToTeam: z.boolean(),
    routine: z.boolean(),
    assigneeIds: z.array(z.string()),
    deadlineDate: z.string().optional(),
    deadlineTime: z.string().optional(),
    routineDays: z.number().int().min(0).optional(),
    themeId: z.string().optional(),
    tagIds: z.array(z.string()),
    routineTitle: z.string().max(MAX_ROUTINE_TITLE).optional(),
    periodicity: z.string().optional(),
    routineDescription: z.string().max(MAX_ROUTINE_DESC).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.routine) {
      if (!data.routineTitle?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Укажите название рутинной задачи',
          path: ['routineTitle'],
        })
      }
      if (!data.periodicity) {
        ctx.addIssue({
          code: 'custom',
          message: 'Выберите периодичность',
          path: ['periodicity'],
        })
      }
    }
  })

export type TaskFormValues = z.infer<typeof taskFormSchema>

export const limits = {
  context: MAX_CONTEXT,
  routineTitle: MAX_ROUTINE_TITLE,
  routineDescription: MAX_ROUTINE_DESC,
} as const

export const defaultValues: TaskFormValues = {
  context: '',
  assignToTeam: false,
  routine: false,
  assigneeIds: [],
  tagIds: [],
  routineDays: 0,
  routineTitle: '',
  periodicity: '',
  routineDescription: '',
  deadlineDate: '',
  deadlineTime: '',
  themeId: '',
}
