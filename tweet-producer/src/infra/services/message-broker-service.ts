import env from '@/config/env'
import { TweetRepository } from '@/infra/db'

import amqp from 'amqplib'

export class MessageBrokerService {
  private readonly queue: string = 'tweets'
  private channel: any
  private connection: any

  constructor (
    private readonly tweetRepository: TweetRepository
  ) {}

  async createConnection (): Promise<void> {
    this.connection = await amqp.connect(env.rabbitmqUrl)
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(this.queue, { durable: true })
  }

  publish (msg: string): void {
    this.channel.sendToQueue(this.queue, Buffer.from(msg))
  }

  async consume (): Promise<void> {
    await this.channel.consume(this.queue, async (msg) => {
      if (msg) {
        const tweet = JSON.parse(msg.content.toString())
        await this.tweetRepository.insertOne(tweet)
        this.channel.ack(msg)
      }
    })
  }
}
