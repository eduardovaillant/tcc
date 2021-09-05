import 'module-alias/register'
import { TweetStreamClient } from '@/clients'

async function streamFactory (): Promise<void> {
  const stream = new TweetStreamClient()
  await stream.start()
}

streamFactory().then(
  () => console.log('Running ...'),
  error => console.error(error)
)
