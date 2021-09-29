import { TweetStreamClient } from '@/infra/clients'
import { MessageBrokerService } from '@/infra/services'

const streamFactory = async (brokerService: MessageBrokerService): Promise<void> => {
  const stream = new TweetStreamClient(brokerService)
  await stream.start()
}

export const producerFactory = async (brokerService: MessageBrokerService): Promise<void> => {
  await streamFactory(brokerService)
}
