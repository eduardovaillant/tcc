import amqp from 'amqplib'

export class MessageBrokerService {
  private queue: string
  private channel: any

  async createQueue (): Promise<void> {
    this.queue = 'tweets'
    const connection = await amqp.connect('amqp://localhost')
    this.channel = await connection.createChannel()
    await this.channel.assertQueue(this.queue, { durable: true })
  }

  publish (msg: string): void {
    this.channel.sendToQueue(this.queue, Buffer.from(msg))
  }
}
