import 'module-alias/register'
import { consumerFactory } from '@/application'
import { MessageBrokerService } from '@/infra/services'
import { TweetRepository } from '@/infra/db'
import env from '@/config/env'

const messageBrokerServiceFactory = async (): Promise<MessageBrokerService> => {
  const tweetRepository = new TweetRepository()
  const brokerService = new MessageBrokerService(tweetRepository)
  await brokerService.createConnection()
  return brokerService
}

const main = async (): Promise<void> => {
  const brokerService = await messageBrokerServiceFactory()
  await consumerFactory(brokerService)
}

main().then(
  () => console.log(`Consuming ${env.queueName} queue ...`),
  error => console.error(error)
)
