import { MongoHelper } from './mongo-helper'
import { TweetModel } from '@/domain/models'
import env from '@/config/env'

export class TweetRepository {
  async insertOne (tweet: TweetModel): Promise<void> {
    const planetsCollection = await MongoHelper.getCollection(env.mongoCollection)
    await planetsCollection.insertOne(tweet)
  }
}
