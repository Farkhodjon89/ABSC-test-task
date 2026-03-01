import { useCallback, useMemo } from 'react'
import {
  Field,
  Flex,
  Icon,
  Portal,
  Spinner,
  Tag,
  VStack,
  Wrap,
  WrapItem,
  Text,
  createListCollection,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxTrigger,
} from '@chakra-ui/react'
import type { AssigneeOption } from '@/types/taskForm'

export type AssigneeSelection = { id: string; name: string }

export interface AssigneeComboboxProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  options: AssigneeOption[]
  isLoading: boolean
  selectedAssignees: AssigneeSelection[]
  onSelectedAssigneesChange: (assignees: AssigneeSelection[]) => void
}

export function AssigneeCombobox({
  searchQuery,
  onSearchChange,
  options,
  isLoading,
  selectedAssignees,
  onSelectedAssigneesChange,
}: AssigneeComboboxProps) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options.map((o) => ({ value: o.data.id, label: o.data.name })),
      }),
    [options]
  )

  const addAssignee = useCallback(
    (id: string, name: string) => {
      if (!selectedAssignees.some((a) => a.id === id)) {
        onSelectedAssigneesChange([...selectedAssignees, { id, name }])
      }
    },
    [selectedAssignees, onSelectedAssigneesChange]
  )

  const removeAssignee = useCallback(
    (id: string) => {
      onSelectedAssigneesChange(selectedAssignees.filter((a) => a.id !== id))
    },
    [selectedAssignees, onSelectedAssigneesChange]
  )

  const selectedSet = new Set(selectedAssignees.map((a) => a.id))

  return (
    <Field.Root>
      <Field.Label>Исполнители задачи</Field.Label>
      <VStack align="stretch" gap="2">
        {selectedAssignees.length > 0 && (
          <Wrap gap="2">
            {selectedAssignees.slice(0, 3).map(({ id, name }) => (
              <WrapItem key={id}>
                <Tag.Root size="sm">
                  <Tag.Label>{name}</Tag.Label>
                  <Tag.CloseTrigger
                    onClick={() => removeAssignee(id)}
                    aria-label={`Удалить ${name}`}
                  />
                </Tag.Root>
              </WrapItem>
            ))}
            {selectedAssignees.length > 3 && (
              <WrapItem>
                <Text fontSize="sm" color="gray.600">
                  ещё {selectedAssignees.length - 3}..
                </Text>
              </WrapItem>
            )}
          </Wrap>
        )}
        <ComboboxRoot
          collection={collection}
          value={[]}
          onValueChange={(e) => {
            const v = e.value[0]
            if (v) {
              const item = collection.items.find((i) => i.value === v)
              if (item) addAssignee(item.value, item.label)
            }
          }}
          inputValue={searchQuery}
          onInputValueChange={(e) => onSearchChange(e.inputValue)}
          selectionBehavior="clear"
        >
          <ComboboxLabel />
          <ComboboxControl
            width="100%"
            minH="10"
            px="3"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            display="flex"
            alignItems="center"
            gap="2"
            _hover={{ borderColor: 'gray.300' }}
            _focusWithin={{ borderColor: 'gray.400', boxShadow: '0 0 0 1px var(--chakra-colors-gray-400)' }}
          >
            <ComboboxInput
              placeholder="Укажите исполнителей проекта"
              flex="1"
              border="none"
              outline="none"
              px="0"
              _focus={{ boxShadow: 'none' }}
            />
            <ComboboxTrigger
              flexShrink={0}
              color="gray.500"
              cursor="pointer"
              outline="none"
              _hover={{ color: 'gray.700' }}
              _focus={{ outline: 'none', boxShadow: 'none' }}
              _focusVisible={{ outline: 'none', boxShadow: 'none' }}
            >
              <Icon viewBox="0 0 24 24" width="5" height="5">
                <path
                  fill="currentColor"
                  d="M7 10l5 5 5-5z"
                />
              </Icon>
            </ComboboxTrigger>
          </ComboboxControl>
          <Portal>
            <ComboboxPositioner>
              <ComboboxContent>
                {isLoading ? (
                  <Flex p="4" justify="center">
                    <Spinner size="sm" />
                  </Flex>
                ) : (
                  collection.items.map((item) => (
                    <ComboboxItem
                      key={item.value}
                      item={item}
                      data-disabled={selectedSet.has(item.value) ? true : undefined}
                    >
                      <ComboboxItemText>{item.label}</ComboboxItemText>
                    </ComboboxItem>
                  ))
                )}
                <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
              </ComboboxContent>
            </ComboboxPositioner>
          </Portal>
        </ComboboxRoot>
      </VStack>
    </Field.Root>
  )
}
