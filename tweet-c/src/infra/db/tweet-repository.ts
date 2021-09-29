import { MongoHelper } from './mongo-helper'
import { TweetModel } from '@/domain/models'

export class TweetRepository {
  async insertOne (tweet: TweetModel): Promise<void> {
    const planetsCollection = await MongoHelper.getCollection('tweets')
    await planetsCollection.insertOne(tweet)
  }
}
