/** Simulate network delay */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
}

export interface Theme {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

const MOCK_PARTICIPANTS: Participant[] = [
  { id: "1", name: "Аблямова Нигора" },
  { id: "2", name: "Исроилов Жамшид" },
  { id: "3", name: "Абдуллаев Фарход" },
  { id: "4", name: "Каримова Сарвиноз" },
  { id: "5", name: "Рахимов Достон" },
  { id: "6", name: "Аблямов Азиз" },
  { id: "7", name: "Нигораева Мадина" },
  { id: "8", name: "Жамшидов Икром" },
  { id: "9", name: "Сарвиноз Карим" },
  { id: "10", name: "Достон Рахим" },
  { id: "11", name: "Азиз Аблямов" },
  { id: "12", name: "Мадина Нигораева" },
  { id: "13", name: "Икром Жамшидов" },
  { id: "14", name: "Тестовый Участник" },
];

const MOCK_TEAMS: Team[] = [
  { id: "t1", name: "Команда разработки", memberCount: 5 },
  { id: "t2", name: "Команда дизайна", memberCount: 3 },
  { id: "t3", name: "Команда аналитики", memberCount: 4 },
  { id: "t4", name: "Команда тестирования", memberCount: 6 },
];

const MOCK_THEMES: Theme[] = [
  { id: "th1", name: "Models" },
  { id: "th2", name: "Design" },
  { id: "th3", name: "Development" },
  { id: "th4", name: "Analytics" },
  { id: "th5", name: "Testing" },
];

const MOCK_TAGS: Tag[] = [
  { id: "tag1", name: "XL" },
  { id: "tag2", name: "Очень важно" },
  { id: "tag3", name: "Срочно" },
  { id: "tag4", name: "Рутина" },
  { id: "tag5", name: "Критично" },
];

const PERIODICITY_OPTIONS = [
  { value: "daily", label: "Ежедневно" },
  { value: "weekly", label: "Еженедельно" },
  { value: "monthly", label: "Ежемесячно" },
];

export async function getParticipants(): Promise<Participant[]> {
  await delay(200);
  return [...MOCK_PARTICIPANTS];
}

export async function getTeams(): Promise<Team[]> {
  await delay(200);
  return [...MOCK_TEAMS];
}

export async function searchParticipants(query: string): Promise<Participant[]> {
  await delay(300);
  if (!query.trim()) return MOCK_PARTICIPANTS.slice(0, 8);
  const q = query.toLowerCase();
  return MOCK_PARTICIPANTS.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 10);
}

export async function searchTeams(query: string): Promise<Team[]> {
  await delay(300);
  if (!query.trim()) return MOCK_TEAMS;
  const q = query.toLowerCase();
  return MOCK_TEAMS.filter((t) => t.name.toLowerCase().includes(q));
}

export function getThemes(): Promise<Theme[]> {
  return delay(150).then(() => [...MOCK_THEMES]);
}

export function getTags(): Promise<Tag[]> {
  return delay(150).then(() => [...MOCK_TAGS]);
}

export function getPeriodicityOptions(): Promise<{ value: string; label: string }[]> {
  return Promise.resolve(PERIODICITY_OPTIONS);
}

export interface CreateTaskPayload {
  context: string;
  assignToTeam: boolean;
  routine: boolean;
  assigneeIds: string[];
  deadlineDate?: string;
  deadlineTime?: string;
  routineDays?: number;
  themeId?: string;
  tagIds: string[];
  files: File[];
  routineTitle?: string;
  periodicity?: string;
  routineDescription?: string;
}

export async function createTask(_payload: CreateTaskPayload): Promise<{ id: string }> {
  await delay(500);
  return { id: `task-${Date.now()}` };
}
