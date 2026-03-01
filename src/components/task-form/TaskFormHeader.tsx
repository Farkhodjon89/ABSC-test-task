import { CloseButton, Flex, Tabs } from '@chakra-ui/react'

export function TaskFormHeader() {
  return (
    <Flex justify="space-between" align="center">
      <Tabs.Root value="task" size="sm">
        <Tabs.List>
          <Tabs.Trigger value="task" colorPalette="purple">
            Создание задачи
          </Tabs.Trigger>
          <Tabs.Trigger value="reminder">Создание напоминания</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <CloseButton aria-label="Закрыть" size="sm" />
    </Flex>
  )
}
