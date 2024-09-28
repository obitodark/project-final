import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
interface Props {
  message?: string
}
export const MessageError = ({ message }: Props) => {
  return (
    <>
      {message && (
        <div className="bg-destructive/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive/100">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <p>{message}</p>
        </div>
      )}</>
  )
}

