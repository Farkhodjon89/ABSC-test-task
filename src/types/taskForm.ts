export type SelectOption = { value: string; label: string }

export type AssigneeOption =
  | { type: 'participant'; data: { id: string; name: string } }
  | { type: 'team'; data: { id: string; name: string } }
