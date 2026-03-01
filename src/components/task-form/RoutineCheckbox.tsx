import { Box, Checkbox, Field, Icon } from '@chakra-ui/react'

interface RoutineCheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const InfoIcon = () => (
  <Icon boxSize="4" opacity={0.7}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  </Icon>
)

export function RoutineCheckbox({ checked, onCheckedChange }: RoutineCheckboxProps) {
  return (
    <Field.Root>
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(e) => onCheckedChange(e.checked === true)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Рутинная задача</Checkbox.Label>
        <Box as="span" ml="1" title="Подсказка" cursor="help">
          <InfoIcon />
        </Box>
      </Checkbox.Root>
    </Field.Root>
  )
}
