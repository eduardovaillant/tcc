import 'module-alias/register'
import { TweetStreamClient } from '@/infra/clients'
import { MongoHelper, TweetRepository } from './infra/db'
import env from './config/env'

async function streamFactory (): Promise<void> {
  const tweetRepository = new TweetRepository()
  const stream = new TweetStreamClient(tweetRepository)
  await stream.start()
}

MongoHelper.connect(env.mongoUrl).then(
  async () => streamFactory().then(
    () => console.log('Running ...'),
    error => console.error(error)
  ),
  error => console.error(error)
)
