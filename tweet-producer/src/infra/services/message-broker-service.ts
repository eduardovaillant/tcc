import env from '@/config/env'
import { TweetRepository } from '@/infra/db'

import amqp from 'amqplib'

export class MessageBrokerService {
  private channel: any
  private connection: any

  constructor (
    private readonly tweetRepository: TweetRepository
  ) {}

  async createConnection (): Promise<void> {
    this.connection = await amqp.connect(env.rabbitmqUrl)
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(env.queueName, { durable: true })
  }

  async consume (): Promise<void> {
    await this.channel.consume(env.queueName, async (msg) => {
      if (msg) {
        const tweet = JSON.parse(msg.content.toString())
        await this.tweetRepository.insertOne(tweet)
        this.channel.ack(msg)
      }
    })
  }
}
