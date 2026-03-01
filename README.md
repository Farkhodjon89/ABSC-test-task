# Task Creation Form

A React application implementing a task creation form with validation, debounced search, and mock API. Built with **react-hook-form**, **TanStack Query**, **Chakra UI 3**, and **Zod**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command   | Description              |
| --------- | ------------------------ |
| `npm run dev`    | Start development server  |
| `npm run build`  | Build for production     |
| `npm run preview`| Preview production build |
| `npm run lint`   | Run ESLint               |

## Tech Stack

- **React 19** + **TypeScript**
- **Vite**
- **react-hook-form** + **@hookform/resolvers** + **Zod** — form state and validation
- **@tanstack/react-query** — server state and debounced search
- **Chakra UI 3** — UI components
- **framer-motion**, **@emotion/react** — Chakra dependencies

## Features

- **Task context** — Required textarea with character counter (0/4096).
- **Assign to team** — Toggle between “Participants” and “Assign to team” modes.
- **Routine task** — Checkbox that shows extra fields: title, periodicity, description, and “days + time” deadline.
- **Assignees** — Multi-select (participants or teams from API). An optional combobox with debounced search (400 ms) exists in `AssigneeCombobox` + `useSearchAssignees` but is not used in the main form.
- **Deadline** — Date + time when not routine; “N days” + time when routine.
- **Theme** — Single select.
- **Tags** — Multi-select.
- **Files** — File upload (Chakra FileUpload).
- **Validation** — Zod schema with required fields, limits, and conditional rules for routine tasks.
- **Mock API** — Simulated endpoints in `src/api/mock.ts` for participants, teams, themes, tags, periodicity, and task creation.

## Project Structure

```
src/
├── api/           # Mock API and types
├── components/
│   ├── task-form/ # Form section components
│   ├── ui/        # Reusable SingleSelectField, MultiSelectField
│   └── TaskCreationForm.tsx
├── hooks/         # useSearchAssignees, useDebouncedValue
├── schemas/       # Zod task form schema
├── types/         # Shared types
├── App.tsx
└── main.tsx
```
