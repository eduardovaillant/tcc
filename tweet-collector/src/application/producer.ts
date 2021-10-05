import { TweetStreamClient } from '@/infra/clients'
import { MessageBrokerService } from '@/infra/services'

export const producerFactory = async (eadBrokerService: MessageBrokerService, presentialBrokerService: MessageBrokerService): Promise<void> => {
  const stream = new TweetStreamClient(eadBrokerService, presentialBrokerService)
  await stream.start()
}
