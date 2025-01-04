export const generateApplicationMessageId = ({
  page,
  title,
  message,
}: {
  page: string
  title: string
  message: string
}) => {
  return `${page}-${title}-${message}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-/]/g, '')
}
