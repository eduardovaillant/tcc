import 'module-alias/register'
import { producerFactory } from '@/application'
import { MessageBrokerService } from '@/infra/services'
import env from '@/config/env'

const messageBrokerServiceFactory = async (): Promise<MessageBrokerService> => {
  const brokerService = new MessageBrokerService()
  await brokerService.createConnection()
  return brokerService
}

const main = async (): Promise<void> => {
  const brokerService = await messageBrokerServiceFactory()
  await producerFactory(brokerService)
}

main().then(
  () => console.log(`Collector Running and publishing to ${env.queueName} queue!`),
  error => console.error(error)
)
