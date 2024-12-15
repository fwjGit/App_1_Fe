import { fetchEventSource } from '@microsoft/fetch-event-source'
import { apiKey } from '@/utils/utils'

const fetchSSE = ({
  url,
  data,
  onmessage,
  onerror,
}: {
  url: string
  data: any
  onmessage: (event: any) => void
  onerror: () => void
}) => {
  return fetchEventSource(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
    onmessage,
    onerror,
  })
}

export default fetchSSE
