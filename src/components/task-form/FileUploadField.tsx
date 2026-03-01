import {
  Button,
  Field,
  FileUploadDropzone,
  FileUploadDropzoneContent,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadRoot,
  FileUploadTrigger,
} from '@chakra-ui/react'

export interface FileUploadFieldProps {
  value: File[]
  onChange: (files: File[]) => void
}

export function FileUploadField({ value, onChange }: FileUploadFieldProps) {
  return (
    <Field.Root>
      <FileUploadRoot
        acceptedFiles={value}
        onFileAccept={(details) => onChange([...value, ...details.files])}
        onFileChange={(details) => onChange(details.acceptedFiles)}
        maxFiles={10}
      >
        <FileUploadLabel>Файлы</FileUploadLabel>
        <FileUploadHiddenInput />
        <FileUploadDropzone
          minH="24"
          borderWidth="2px"
          borderStyle="dashed"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
        >
          <FileUploadDropzoneContent>
            <FileUploadTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                📎 Прикрепите файлы
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzoneContent>
        </FileUploadDropzone>
        <FileUploadItemGroup>
          <FileUploadItems clearable />
        </FileUploadItemGroup>
      </FileUploadRoot>
    </Field.Root>
  )
}
