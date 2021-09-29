import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/TCC',
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
  mongoCollection: process.env.MONGO_COLLECTION || 'tweets',
  queueName: process.env.QUEUE_NAME || 'tweets'
}
