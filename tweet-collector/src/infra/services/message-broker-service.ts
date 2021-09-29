import env from '@/config/env'

import amqp from 'amqplib'

export class MessageBrokerService {
  private channel: any
  private connection: any

  async createConnection (): Promise<void> {
    this.connection = await amqp.connect(env.rabbitmqUrl)
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(env.queueName, { durable: true })
  }

  publish (msg: string): void {
    this.channel.sendToQueue(env.queueName, Buffer.from(msg))
  }
}
