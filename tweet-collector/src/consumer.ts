import { MongoHelper } from '@/infra/db'
import { MessageBrokerService } from '@/infra/services'
import env from './config/env'

export const consumerFactory = async (brokerService: MessageBrokerService): Promise<void> => {
  await MongoHelper.connect(env.mongoUrl)
  brokerService.consume()
}
