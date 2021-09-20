import 'module-alias/register'
import { consumerFactory, producerFactory } from '@/application'
import { MessageBrokerService } from '@/infra/services'
import { TweetRepository } from '@/infra/db'

const messageBrokerServiceFactory = async (): Promise<MessageBrokerService> => {
  const tweetRepository = new TweetRepository()
  const brokerService = new MessageBrokerService(tweetRepository)
  await brokerService.createConnection()
  return brokerService
}

const main = async (): Promise<void> => {
  const brokerService = await messageBrokerServiceFactory()
  await producerFactory(brokerService)
  await consumerFactory(brokerService)
}

main().then(
  () => console.log('Collector Running ...'),
  error => console.error(error)
)
