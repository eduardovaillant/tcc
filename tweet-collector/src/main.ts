import 'module-alias/register'
import { producerFactory } from '@/application'
import { MessageBrokerService } from '@/infra/services'
import env from '@/config/env'

const messageBrokerServiceFactory = async (queueName: string): Promise<MessageBrokerService> => {
  const brokerService = new MessageBrokerService(queueName)
  await brokerService.createConnection()
  return brokerService
}

const main = async (): Promise<void> => {
  const eadBrokerService = await messageBrokerServiceFactory(env.eadQueueName)
  const presentialBrokerService = await messageBrokerServiceFactory(env.presentialQueueName)
  await producerFactory(eadBrokerService, presentialBrokerService)
}

main().then(
  () => console.log('Collector Running ...'),
  error => console.error(error)
)
