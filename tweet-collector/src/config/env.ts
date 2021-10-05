import dotenv from 'dotenv'
dotenv.config()

export default {
  twitterBaseUrl: process.env.TWITTER_BASE_URL || '',
  bearerToken: process.env.BEARER_TOKEN || '',
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
  eadQueueName: process.env.EAD_QUEUE_NAME || 'ead-tweets-queue',
  presentialQueueName: process.env.PRESENTIAL_QUEUE_NAME || 'presential-tweets-queue'
}
