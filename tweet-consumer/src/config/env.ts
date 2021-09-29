import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrlDev: process.env.MONGO_DEV_URL || 'mongodb://localhost:27017/TCC',
  mongoUrlProd: process.env.MONGO_PROD_URL || '',
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
  mongoCollection: process.env.MONGO_COLLECTION || 'tweets',
  queueName: process.env.QUEUE_NAME || 'tweets',
  environment: process.env.ENVIRONMENT || 'dev'
}
