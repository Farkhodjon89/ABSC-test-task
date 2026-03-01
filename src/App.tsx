import { Box } from '@chakra-ui/react'
import { TaskCreationForm } from '@/components/TaskCreationForm'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <>
      <Box
        minH="100vh"
        bg="gray.50"
        p="4"
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <Box width="100%" maxWidth="640px" flexShrink={0}>
          <TaskCreationForm />
        </Box>
      </Box>
      <Toaster />
    </>
  )
}

export default App
