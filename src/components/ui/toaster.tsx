import {
  createToaster,
  Toaster as ChakraToaster,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
  ToastIndicator,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top-end',
})

export function Toaster() {
  return (
    <ChakraToaster toaster={toaster}>
      {(ctx) => (
        <ToastRoot
          bg="white"
          color="gray.800"
          p="4"
          minW="320px"
          borderRadius="md"
          boxShadow="lg"
          borderWidth="1px"
          borderColor="gray.200"
          zIndex={9999}
        >
          <ToastIndicator />
          {ctx.title != null && ctx.title !== '' && (
            <ToastTitle fontWeight="semibold">{ctx.title}</ToastTitle>
          )}
          {ctx.description != null && ctx.description !== '' && (
            <ToastDescription color="gray.600" fontSize="sm" mt="1">
              {ctx.description}
            </ToastDescription>
          )}
          <ToastCloseTrigger />
        </ToastRoot>
      )}
    </ChakraToaster>
  )
}
