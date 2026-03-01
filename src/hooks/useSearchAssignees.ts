import { useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from './useDebouncedValue'
import {
  searchParticipants,
  searchTeams,
  type Participant,
  type Team,
} from '@/api/mock'

const DEBOUNCE_MS = 400

export function useSearchParticipants(search: string) {
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS)
  return useQuery({
    queryKey: ['participants', debouncedSearch],
    queryFn: () => searchParticipants(debouncedSearch),
    enabled: true,
  })
}

export function useSearchTeams(search: string) {
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS)
  return useQuery({
    queryKey: ['teams', debouncedSearch],
    queryFn: () => searchTeams(debouncedSearch),
    enabled: true,
  })
}

export type AssigneeItem = 
  | { type: 'participant'; data: Participant }
  | { type: 'team'; data: Team }

export function useSearchAssignees(search: string, assignToTeam: boolean) {
  const participantsQuery = useSearchParticipants(assignToTeam ? '' : search)
  const teamsQuery = useSearchTeams(assignToTeam ? search : '')

  if (assignToTeam) {
    return {
      data: teamsQuery.data?.map((t) => ({ type: 'team' as const, data: t })) ?? [],
      isLoading: teamsQuery.isLoading,
      isFetching: teamsQuery.isFetching,
    }
  }
  return {
    data: participantsQuery.data?.map((p) => ({ type: 'participant' as const, data: p })) ?? [],
    isLoading: participantsQuery.isLoading,
    isFetching: participantsQuery.isFetching,
  }
}
