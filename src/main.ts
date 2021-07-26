import 'module-alias/register'
import { TweetStreamClient } from '@/clients'
import { MessageBrokerService } from '@/services'

async function streamFactory (): Promise<void> {
  const brokerService = new MessageBrokerService()
  await brokerService.createQueue()
  const stream = new TweetStreamClient(brokerService)
  await stream.start()
}

streamFactory().then(
  () => console.log('Running ...'),
  error => console.error(error)
)
